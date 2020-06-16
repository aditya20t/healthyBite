import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import styles from './CartDropdown.module.css';
import { withRouter } from 'react-router-dom';
import CartItem from '../cartItem/CartItem';
import PropTypes from 'prop-types';
import { toggleCartHidden } from '../../actions/cart';
import { selectCartItems } from '../../selectors/cart';

const CartDropdown = ({cartItems, history, dispatch}) =>(
    <div className={styles.cartDropdown}>
        <div className={styles.cartItems}>
            {
                cartItems.length ? 
                cartItems.map(cartItem => <CartItem key={cartItem._id} item={cartItem} />) : 
                <div className={styles.empty}><span >No cart items</span></div>
                }
        </div>
        <CustomButton className={styles.button} onClick={() => {
            history.push('/checkout'); 
            dispatch(toggleCartHidden())
            }}>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));