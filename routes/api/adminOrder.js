const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const AdminOrder = require('../../models/AdminOrder');


// @route   GET api/adminorder
// @desc    Read all orders
// @access  Private (Admin)
router.get('/', auth.admin, async (req, res) => {
    try {
        let start = new Date();
        start.setHours(0,0,0,0);

        let end = new Date();
        end.setHours(23,23,59,999);
        const orders = await AdminOrder.find({date: {$gte: start, $lt: end}});
        if(!orders) {
            res.json({msg: 'No orders placed today'});
        }
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});




module.exports = router;