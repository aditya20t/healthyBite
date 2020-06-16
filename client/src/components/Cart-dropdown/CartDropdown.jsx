import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import styles from './CartDropdown.module.css';
import CartItem from '../cartItem/CartItem';
import { selectCartItems } from '../../selectors/cart';

const CartDropdown = ({cartItems}) =>(
    <div className={styles.cartDropdown}>
        <div className={styles.cartItems}>
            {
                cartItems.length ? 
                cartItems.map(cartItem => <CartItem key={cartItem._id} item={cartItem} />) : 
                <div className={styles.empty}><span >No cart items</span></div>
                }
        </div>
        <CustomButton className={styles.button}>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);