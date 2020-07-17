import React, { Fragment, useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import ManageOrderItem from '../ManageOrderItem/ManageOrderItem'

const ManageOrders = () => {
    let loading = true;
    const [data, setData] = useState({orders: [], loading: true});
    useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        '/api/adminorder',
      );
      loading = false;
      setData({orders: result.data, loading:false});
    };
 
    fetchData();
  }, []);
  return data.length > 0 ?
    <div>
    <h3>Today's orders</h3>
    <table className='table table-striped'>
    <thead>
    <tr>
        <th>Order Id</th>
        <th>Date</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Mode</th>
        <th>Details</th>
      </tr>
    </thead>
      <tbody>
      {!data.loading ? data.orders.map(item => (
        <ManageOrderItem key={item._id} data={item} />
      )) : null}
      </tbody>
    </table>
    </div>
  : <h3>No order placed today...</h3>;
}

export default withRouter(ManageOrders);