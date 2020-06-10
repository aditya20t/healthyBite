import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const initilState = {
    profile: null,
    loading: true,
    error: {}
}

export default function(state= initilState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading:false
            };
            break;
        case PROFILE_ERROR: 
            return{
                ...state,
                error: payload,
                loading: false
            };
            break;
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false
            };
            break;
        default:
            return state;
            break;
    }
}