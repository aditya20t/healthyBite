import { GET_PRODUCTS, PRODUCT_ERROR, ADD_PRODUCT, REMOVE_PRODUCT, GET_ITEM } from './types';
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
export const deleteProduct = (product) => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const body = JSON.stringify({product});
            await axios.delete('/api/product',{
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    body
                }
            });

            dispatch({ 
                type: REMOVE_PRODUCT,
                payload: product
            });
            dispatch(getProducts);
            dispatch(setAlert('Product Deleted', 'danger'));
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

// Get Item
export const getItem = item => dispatch => {
    dispatch ({
        type: GET_ITEM,
        payload: item
    })
}