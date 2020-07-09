import React from 'react';
import styles from './Checkout.module.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../selectors/cart';
import CheckoutItem from '../CheckoutItem/CheckoutItem';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

const Cart = ({cartItems, total}) => {
    let items = JSON.parse(window.localStorage.getItem('items'));
    cartItems = items || [];

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {
            total
        }
        const data = await axios.post('/api/razorpay', body, config);
		const {amount, id, currency} = data.data;
        let href = '';
		const options = {
			key: __DEV__ ? 'rzp_test_mgd2E9MT8P6IRT' : 'PRODUCTION_KEY',
			currency: currency,
			amount: amount,
			order_id: id,
			name: 'Pay Online',
            description: 'Thanks for shopping with us!',
            image: '/static/media/logo1.4a166e5e.jpeg',
			handler: function (response) {
                // alert(response.razorpay_payment_id);
                var redirect_url;
                if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                    redirect_url = '/payment/fail';
                } else {
                    redirect_url = `/payment/success?p_id=${response.razorpay_payment_id}&o_id=${response.razorpay_order_id}&sign=${response.razorpay_signature}`;
                }
                window.location.href = redirect_url;
			},
			prefill: {
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			},
            theme: {
                "color": "#b6eb7a"
            }
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


    return(
        <div className={styles.checkoutPage}>
            <div className={styles.checkoutHeader} >
                <div className={styles.headerBlocks} >
                    <span>Product</span>
                </div>
                <div className={styles.headerBlocks} >
                    <span>Description</span>
                </div>
                <div className={styles.headerBlocks} >
                    <span>Quantity</span>
                </div>
                <div className={styles.headerBlocks} >
                    <span>Price</span>
                </div>
                <div className={styles.headerBlocks} >
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => (
                    <CheckoutItem key={cartItem._id} cartItems={cartItem} />
                ))
            }
            <div className={styles.total} ><span>TOTAL: Rs.{total}</span></div>
            <div>
            <button className='btn btn-lg btn-outline-success' onClick={displayRazorpay}>Pay Online</button>
            <button className='btn btn-lg btn-outline-secondary'>Cash on delievery</button>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Cart);