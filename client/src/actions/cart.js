import {TOGGLE_CART_HIDDEN, ADD_ITEM} from './types';

export const toggleCartHidden = () => dispatch => {
    dispatch({
        type: TOGGLE_CART_HIDDEN
    })
};

export const addItem = (item) => dispatch => {
    dispatch({
        type: ADD_ITEM,
        payload: item
    })
};