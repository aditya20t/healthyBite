import {TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } from '../actions/types';
import {addItemsToCart, removeItemFromCart} from '../utils/cart';
import cartItem from '../components/cartItem/CartItem';
const initialState = {
    hidden: true,
    cartItems: JSON.parse(localStorage.getItem('items')) || []
}

export default function(state=initialState, action) {
    switch(action.type) {
        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case ADD_ITEM:
            return {
                ...state,
                cartItems: addItemsToCart(state.cartItems, action.payload)
            }
        case REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem._id !== action.payload._id)
            }
        default:
            return state; 
    }
}