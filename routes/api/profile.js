const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');


// @route   GET api/profile
// @desc    Tests profile route
// @access  Private
router.get('/', auth.user, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user : req.user.id}).populate('user', ['name', 'phone']);

        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create/ update profile
// @access  Private
router.post('/', [auth.user, [
    check('address', 'Address is required').not().isEmpty(),
    check('pincode', 'Pincode is required').isLength({min: 6, max:6 })
]], async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }

     const { email, address, gender, pincode } = req.body;

     // Build profile object
     const profileFields = {};
     profileFields.user = req.user.id;
     if(email) profileFields.email = email;
     profileFields.address = address;
     if(gender) profileFields.gender = gender;
     profileFields.pincode = pincode;

     try {
         let profile = await Profile.findOne({user: req.user.id});
         if(profile) {
             // Update
             profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}), {useFindandModify: false};
             return res.json(profile); 
         }

         profile = new Profile(profileFields);
         await profile.save();
         res.json(profile);

    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }

});

// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private
router.delete('/', auth.user, async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove({ user : req.user.id}), {useFindandModify: false};
        // Remove user
        await User.findOneAndRemove({_id: req.user.id}), {useFindandModify: false};

        res.json({msg: 'User deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
