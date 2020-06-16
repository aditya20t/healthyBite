import cart from "../reducers/cart";

export const addItemsToCart = (cartItems, cartItemsToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem._id === cartItemsToAdd._id);

    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem._id === cartItemsToAdd._id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem );
    }

    return [...cartItems, {...cartItemsToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove ) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem._id === cartItemToRemove._id
    )

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);
    }

    return cartItems.map(
        cartItem => cartItem._id === cartItemToRemove._id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
}