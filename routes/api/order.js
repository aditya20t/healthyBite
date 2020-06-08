const express = require('express');
const router = express.Router();

// @route   POST api/order
// @desc    Order Successfull
// @access  Private

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;
