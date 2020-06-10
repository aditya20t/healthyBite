import { PRODUCT_ERROR, GET_PRODUCTS } from '../actions/types';

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
            break;
        
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
            break;
        
        default:
            return state;
            break;
    }
}