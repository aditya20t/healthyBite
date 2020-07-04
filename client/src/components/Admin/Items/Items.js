import React, { PureComponent, Fragment } from 'react'
import {deleteProduct, getItem } from '../../../actions/products';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import styles from './Items.module.css';
import { Link } from 'react-router-dom';

const Items = ({deleteProduct ,product, getItem}) => {
    const  {name, image, marketPrice, hbPrice, stock } = product;
    return(
            <Fragment>
                <tr style={{textAlign: 'center'}}>
                <td><img src={image} className={styles.image}/></td>
                <td>{name}</td>
                <td>{marketPrice}</td>
                <td>{hbPrice}</td>
                <td>{stock}</td>
                <td><Link to='/admin/editProduct' onClick={() => getItem(product)}><i className="fa fa-pencil-alt"></i></Link></td>
                <td><div onClick={() => deleteProduct(product)} style={{cursor: 'pointer', color: 'red'}}><i className="fa fa-times"></i></div></td>
                </tr>
            </Fragment>
           
    )
};

Items.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    getItem: PropTypes.func.isRequired
}

export default connect(null, {deleteProduct, getItem})(Items);