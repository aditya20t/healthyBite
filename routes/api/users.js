const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/keys.json').jwtSecret;
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Sign up user
// @access  Public
router.post('/', [
    check('name', 'Name is requires').not().isEmpty(),
    check('phone', 'Please include a valid number').isNumeric().isLength({min: 10}),
    check('password','Please enter password with 6 or more characters').isLength({min: 6})
],async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    } 

    const { name, phone, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({phone});

        if(user) {
            res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        user = new User ({
            name,
            phone,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
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
