import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import styles from './CartDropdown.module.css';
import CartItem from '../cartItem/CartItem';
import cart from '../../reducers/cart';

const CartDropdown = ({cartItems}) =>(
    <div className={styles.cartDropdown}>
        <div className={styles.cartItems}>
            {cartItems.map(cartItem => <CartItem key={cartItem._id} item={cartItem} />)}
        </div>
        <CustomButton>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);