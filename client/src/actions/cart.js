import {TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, CLEAR_CART } from './types';

export const toggleCartHidden = () => dispatch => {
    dispatch({
        type: TOGGLE_CART_HIDDEN
    })
};

export const addItem = (item) => dispatch => {
    item.quantity = 1;
    let items = [];
    if(localStorage.getItem('items')){
        items = JSON.parse(localStorage.getItem('items'));
    }
    var index = items.findIndex(x => x.name === item.name);

    if(!items[index]) {
        items.push({'_id': item._id ,'image': item.image, 'name': item.name, 'quantity': item.quantity, 'hbPrice': item.hbPrice, 'stock': item.stock});
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
    if(items[index].quantity > 1) {
        items[index].quantity -= 1;
    } else  if(items[index].quantity === 1) {
        items.splice(index, 1);
    }
    localStorage.setItem('items', JSON.stringify(items));

    dispatch({
        type: REMOVE_ITEM,
        payload: item
    });
}

export const clearItemFromCart = (item) => dispatch => {
    let items = [];
    if(localStorage.getItem('items')){  
        items = JSON.parse(localStorage.getItem('items'));
    }
    var index = items.findIndex(x => x.name === item.name);
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    dispatch({
        type: CLEAR_ITEM_FROM_CART,
        payload: item
    })
}

export const clearCart = () => dispatch => {
    localStorage.removeItem('items');
    dispatch({
        type: CLEAR_CART
    })
}