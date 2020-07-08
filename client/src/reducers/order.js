import {POST_ORDER} from '../actions/types';

const initialState = {
    order: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case POST_ORDER:
            return {
                ...state,
                order: payload
            }
        
        default:
            return{
                state
            }
    }
}