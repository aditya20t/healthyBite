const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = require('../../config/keys.json').jwtSecret;
const { check, validationResult } = require('express-validator');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth,  async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('phone', 'Please include a valid number').isNumeric().isLength({min: 10}),
    check('password','Password is required').exists()
],async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    } 

    const { phone, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({phone});

        if(!user) {
            res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        // Match phone and password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }
        // Return jsonwebtoken
        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(payload, jwtSecret, {expiresIn: 3600000}, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;