import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './AdminDashboard.module.css';
import { getProducts } from '../../actions/products';


const AdminDashboard = ({getProducts, product: {products, loading}}) => {
    useEffect(() => {
        getProducts();
    }, []);

    return loading ? <p>Loading...</p> : <Fragment>
    {products.length>0 ? (products.map(product => (
        <div>
            <h1>Name: {product.name}</h1>
            <h3>Stock: {product.stock}</h3>
        </div>
    ))) : <p>No products</p> } </Fragment>
};

AdminDashboard.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product : PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    product : state.product
});


export default connect(mapStateToProps, {getProducts} )(AdminDashboard);