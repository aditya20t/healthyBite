const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const auth = require('../../middleware/auth');
const shortid = require('shortid');
const config = require('../../config/keys.json');

// POST /api/razorpay
// Payment route
// Private route

const razorpay = new Razorpay({
	key_id: config.razorpay_keyID,
	key_secret: config.razorpay_keySecret
})

router.post('/', auth.user, async (req, res) => {
    const {price} = req.body;
    const payment_capture = 1;
	const amount = price;
	const currency = 'INR';

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
});

module.exports = router;