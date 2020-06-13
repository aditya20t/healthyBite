import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import styles from './CartDropdown.module.css';

const CartDropdown = () =>(
    <div className={styles.cartDropdown}>
        <div className={styles.cartItems}></div>
        <CustomButton>CHECKOUT</CustomButton>
    </div>
)


export default CartDropdown;