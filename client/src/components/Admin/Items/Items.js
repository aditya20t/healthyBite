import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './Items.module.css';
import classnames  from 'classnames';

const Items = ({product: {name, image, marketPrice, hbPrice, stock }}) => {
    return(
            <Fragment>
                <tr>
                <td><img src={image} className={styles.image}/></td>
                <td>{name}</td>
                <td>{marketPrice}</td>
                <td>{hbPrice}</td>
                <td>{stock}</td>
                <td><i className='fa fa-pencil-alt' /></td>
                <td>X</td>
                </tr>
            </Fragment>
           
    )
};


export default Items;