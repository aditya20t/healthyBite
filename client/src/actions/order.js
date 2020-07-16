import {SAVE_ORDER} from '../actions/types';
import axios from 'axios';

export const saveOrder =  (data) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"  
            }
        }
        let data1 = {
            items: data.items,
            order_id: data.order_id,
            mode: data.mode,
            amount: data.amount
        }
        let res = await axios.post('/api/order', data1, config);
        dispatch({
            type: SAVE_ORDER
        })
    } catch (err) {
        console.log(err.message);
    }
};