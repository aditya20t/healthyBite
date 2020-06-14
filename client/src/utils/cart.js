export const addItemsToCart = (cartItems, cartItemsToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem._id === cartItemsToAdd._id);

    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem._id === cartItemsToAdd._id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem );
    }

    return [...cartItems, {...cartItemsToAdd, quantity: 1}];
}