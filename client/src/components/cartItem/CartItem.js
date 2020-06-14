import React from 'react';
import styles from './CartItem.module.css';

const cartItem = ({item: {image, hbPrice, name, quantity}}) => {
    return(
        <div className={styles.cartItem}>
            <img src={image} alt='item' />
            <div className={styles.itemDetails}>
                <span className={styles.name}>{name}</span>
                <span className={styles.hbPrice}>{quantity} x Rs.{hbPrice}</span>
            </div>
        </div>
    )
}

export default cartItem;