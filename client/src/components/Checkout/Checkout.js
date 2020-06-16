import React from 'react';
import styles from './Checkout.module.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../selectors/cart';
import CheckoutItem from '../CheckoutItem/CheckoutItem';

const Cart = ({cartItems, total}) => {
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
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Cart);