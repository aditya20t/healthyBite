import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './AdminDashboard.module.css';
import { getProducts } from '../../../actions/products';
import Items from '../Items/Items';
import cx from 'classnames';


const AdminDashboard = ({getProducts, product: {products, loading}}) => {
    useEffect(() => {
        getProducts();
    }, []);

    return loading ? <p>Loading...</p> : <Fragment>
    {products.length>0 ? <div className= {cx('container')}>
        <h4>Products</h4>
        <table class="table table-bordered">
        <thead>
        <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Market Price</th>
            <th>HB Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {(products.map(product => (
            <Items key={product._id} product={product} />
        )))}
        </tbody>
        </table>
    </div> : <p>No products</p> } </Fragment>
};

AdminDashboard.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product : PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    product : state.product
});


export default connect(mapStateToProps, {getProducts} )(AdminDashboard);