import React, { PureComponent, Fragment } from 'react'
import {deleteProduct} from '../../../actions/products';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import styles from './Items.module.css';
import product from '../../../reducers/product';

const Items = ({deleteProduct ,product}) => {
    const  {name, image, marketPrice, hbPrice, stock } = product;
    return(
            <Fragment>
                <tr>
                <td><img src={image} className={styles.image}/></td>
                <td>{name}</td>
                <td>{marketPrice}</td>
                <td>{hbPrice}</td>
                <td>{stock}</td>
                <td><i className='fa fa-pencil-alt' /></td>
                <td><div onClick={() => deleteProduct(product)}><i className="fa fa-times"></i></div></td>
                </tr>
            </Fragment>
           
    )
};

Items.propTypes = {
    deleteProduct: PropTypes.func.isRequired
}

export default connect(null, {deleteProduct})(Items);