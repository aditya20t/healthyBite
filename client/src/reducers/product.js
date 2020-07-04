import { PRODUCT_ERROR, GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT } from '../actions/types';
const initialState = {
    products: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            };
        
        case ADD_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }

        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload._id),
                loading: false
            }
        
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        
        default:
            return state;
    }
}