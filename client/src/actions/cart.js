import {TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } from './types';

export const toggleCartHidden = () => dispatch => {
    dispatch({
        type: TOGGLE_CART_HIDDEN
    })
};

export const addItem = (item) => dispatch => {
    item.quantity = 0;
    let items = [];
    if(localStorage.getItem('items')){
        items = JSON.parse(localStorage.getItem('items'));
    }
    var index = items.findIndex(x => x.name === item.name);

    if(index === -1) {
        items.push({'_id': item._id ,'image': item.image, 'name': item.name, 'quantity': item.quantity+1, 'hbPrice': item.hbPrice});
    } else {
        items[index].quantity += 1;
    }
    localStorage.setItem('items', JSON.stringify(items));

    dispatch({
        type: ADD_ITEM,
        payload: item
    })
};

export const removeItem = item => dispatch => {
    let items = [];
    if(localStorage.getItem('items')){
        items = JSON.parse(localStorage.getItem('items'));
    }
    var index = items.findIndex(x => x.name === item.name);

    if(items[index].quantity !== 0 && items[index] > 0) {
        items[index].quantity -= 1;
    } else{
        items.splice(index, 1);
    }
    localStorage.setItem('items', JSON.stringify(items));

    dispatch({
        type: REMOVE_ITEM,
        payload: item
    });
}

export const clearItemFromCart = (item) => dispatch => {
    dispatch({
        type: CLEAR_ITEM_FROM_CART,
        payload: item
    })
}

