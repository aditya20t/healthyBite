import {TOGGLE_CART_HIDDEN} from './types';

export const toggleCartHidden = () => dispatch => {
    dispatch({
        type: TOGGLE_CART_HIDDEN
    })
};