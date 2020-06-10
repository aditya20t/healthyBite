import React from 'react';

export default  function({product}) {
    return (
        <div style={{display: 'inline-block'}}>
            <img 
            src= {product.image}
            alt="new"
            style={{width: '200px', height: '200px'}}
            />
            <h5>Name: {product.name}</h5>
            <h6 style={{textDecoration: 'line-through'}}>Market Price: {product.marketPrice}</h6>
            <h6>HB Price: {product.hbPrice}</h6>
            
        </div>
)};