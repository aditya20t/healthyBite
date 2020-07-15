const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Razorpay = require('razorpay');
const auth = require('../../middleware/auth');
const config = require('../../config/keys.json');
const Payment = require('../../models/Payment');


// Validating payment
router.post('/verification', async (req, res) => {
	try {
		const secret = '123456321';
		const crypto = require('crypto')
	
		const shasum = crypto.createHmac('sha256', secret)
		shasum.update(JSON.stringify(req.body))
		const digest = shasum.digest('hex')
	
		if (digest === req.headers['x-razorpay-signature']) {
			let response = req.body;
			let pay = {
				data: response
			}
			let data1 = new Payment(pay);
			await data1.save();
		} else {
			// pass it
		}
		res.json({ status: 'ok' })
	} catch (err) {
		console.error(err.message);	
	}
});

router.post('/',auth.user, async (req, res) => {
	const payment_capture = 1
	const amount = req.body.total
	const currency = 'INR'
    const razorpay = new Razorpay({
        key_id: config.razorpay_keyID,
        key_secret: config.razorpay_secret
    })
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options);
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		});

	} catch (error) {
		console.log(error)
	}
})

module.exports = router;