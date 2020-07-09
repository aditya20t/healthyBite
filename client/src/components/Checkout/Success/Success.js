import React from 'react';
import qs from 'qs';
import Styles from './Success.module.css'
import { Link } from 'react-router-dom';

const Success = (props) => {
    var data = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const {p_id, o_id, sign} = data;
    return(
        <div className={Styles.window}>
            <div className={Styles.cardcontainer}>
            <img className={Styles.image} src={require('./success1.gif')} />
            <div className={Styles.description} >
                <h2 className='text-center text-success'>Payment Successful</h2>
                <p>Order details</p>
                <ul>
                    <li>Payment ID: {p_id}</li>
                    <li>Order ID: {o_id}</li>
                </ul>
                <p>Thanks for shopping with us!! </p>
            </div>
            <Link to='/' className='btn btn-outline-success'>Continue shopping</Link>
            </div>
        </div>
    )
}


export default Success;