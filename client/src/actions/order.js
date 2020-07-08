import {POST_ORDER} from './types';
import axios from 'axios';

export const postOrder = data => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body1 = {
            price: data
        }
        const body = JSON.stringify(body1);
        const res = await axios.post('/api/razorpay', body, config);
        dispatch({
            type: POST_ORDER,
            payload: res
        })
    } catch (err) {
        
    }
}