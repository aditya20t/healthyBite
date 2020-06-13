import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {login, loadUser} from '../../actions/auth';
import Styles from './login.module.css';
import { $CombinedState } from 'redux';

const Login = ({login, isAuthenticated, loadUser}) => {

    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const { phone, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(phone, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        loadUser();
        return <Redirect to='/' />;
    }

    return(
        <section className={Styles.loginpage}>
            <div className={Styles.loginform}>
                <h1 className={Styles.heading}>Login to Your Account</h1>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Enter phone"  name="phone" value={phone} onChange={e => onChange(e)} size='10' required/>
                        <small className='form-text' className={Styles.phoneinfo}>Number should be without +91</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter password"  name="password" value={password} onChange={e => onChange(e)} required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        </section>  
    )

};

Login.prototype = {
    login: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, {login, loadUser})(Login);