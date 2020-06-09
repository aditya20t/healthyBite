const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route   POST api/order
// @desc    Order Successfull
// @access  Private

router.post('/', auth.user, (req, res) => {

});

module.exports = router;
