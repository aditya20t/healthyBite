import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ProductItem from '../ProductItem/ProductItem';
// import styles from './Landing.module.css';
import { getProducts } from '../../actions/products';



const Landing = ({getProducts, product: {products, loading} }) => {
    useEffect(() => {
        getProducts();
    }, []);
    console.log(products);
    return loading ? <div><Spinner /></div>: <Fragment>
            {products.length>0 ? (products.map(product => (
                <ProductItem key={product._id} product = {product} />
            ))) : <p>Server Down</p> }
        </Fragment>
};

Landing.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Landing);