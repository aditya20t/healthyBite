import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/cart';

const ProductItem =  ({product, addItem}) => {
    const { image, name, marketPrice, hbPrice } = product;
    return (
        <div style={{display: 'inline-block'}}>
            <img 
            src= {image}
            alt="new"
            style={{width: '200px', height: '200px'}}
            />
            <h5>Name: {name}</h5>
            <h6 style={{textDecoration: 'line-through'}}>Market Price: {marketPrice}</h6>
            <h6>HB Price: {hbPrice}</h6>
            <button className="btn btn-dark" onClick={() => addItem(product)}><i className="fa fa-plus"></i> Add to cart</button>
        </div>
)};

ProductItem.protoType = {
    addItem: PropTypes.func.isRequired
}

export default connect(null, {addItem})(ProductItem);