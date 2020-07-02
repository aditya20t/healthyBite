import { GET_PRODUCTS, PRODUCT_ERROR, ADD_PRODUCT, REMOVE_PRODUCT } from './types';
import { setAlert } from './alert';
import axios from 'axios';


export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/product');
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Create or update product
export const createProduct = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/product', formData, config);
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Product Updated' : 'Product Created', 'success'));

        if(!edit) {
            history.push('/admin/dashboard');
        } else {
            history.push('/admin/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        });
    }
};

// Delete product
// export const deleteAccount = () => async dispatch => {
//     if(window.confirm('Are you sure? This can NOT be undone!')) {
//         try {
//             await axios.delete('/api/profile');

//             dispatch({ type: CLEAR_PROFILE });
//             dispatch({ type: ACCOUNT_DELETED });
//             dispatch(setAlert('Account Deleted'));
//         } catch (err) {
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText , status: err.response.status }
//             });
//         }
//     }
// };