import React from 'react';
import styles from './CheckoutItem.module.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { clearItemFromCart, addItem, removeItem } from '../../actions/cart';

const CheckoutItem = ({cartItems, clearItemFromCart, addItem, removeItem }) => {
    const { name, image, hbPrice, quantity} = cartItems;
    return(
    <div className={styles.checkoutItem}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src={image} alt='Item' />
        </div>
        <span className={styles.name}>{name}</span>
        <span className={styles.quantity}>
        <div className={styles.arrow} onClick={() => removeItem(cartItems)}>&#10094;</div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={() => addItem(cartItems)}>&#10095;</div>
        </span>
        <span className={styles.price}>₹{hbPrice}/kg</span>
        <div className={styles.removeButton} onClick={() => clearItemFromCart(cartItems)}>&#10005;</div>
    </div>
)};


CheckoutItem.propTypes = {
    clearItemFromCart: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
}



export default connect(null, {clearItemFromCart, addItem, removeItem})(CheckoutItem);