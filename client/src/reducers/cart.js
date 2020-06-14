import {TOGGLE_CART_HIDDEN, ADD_ITEM} from '../actions/types';
import {addItemsToCart} from '../utils/cart';
const initialState = {
    hidden: true,
    cartItems: []
}

export default function(state=initialState, action) {
    switch(action.type) {
        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
            break;
        case ADD_ITEM:
            return {
                ...state,
                cartItems: addItemsToCart(state.cartItems, action.payload)
            }
        default:
            return state; 
    }
}