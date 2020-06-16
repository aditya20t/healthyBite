import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, loadUser } from '../../actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import Styles from './register.module.css';


const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        password2: ''
    });

    const { name, phone, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert('Password not match', 'danger');
        } else {
            props.register({ name, phone, password });
        }
    }

    if (props.isAuthenticated) {
        props.loadUser();
        return <Redirect to='/' />
    }

    return (
        <section className={Styles.background}>
            <div className={Styles.registerbox}>
                <div className={Styles.registerform}>
                    <h1 className={Styles.heading}>Create Account</h1>
                    <form className='form' onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input className={Styles.input} placeholder="Enter Your Name" name="name" value={name} onChange={e => onChange(e)} required autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <input className={Styles.input} placeholder="Enter Mobile Number" name="phone" onFocus={numberDisplay} value={phone} onChange={e => onChange(e)} size='10' required autoComplete="off" />
                            <small className='form-text' id='phone' className={Styles.info}></small>
                        </div>
                        <div className="form-group">
                            <input type="password" className={Styles.input} placeholder="Enter password" onFocus={passDisplay} name="password" value={password} onChange={e => onChange(e)} required />
                            <small className='form-text' className={Styles.info} id="pass" ></small>
                        </div>
                        <div className="form-group">
                            <input type="password" className={Styles.input} placeholder="Enter password again" name="password2" value={password2} onChange={e => onChange(e)} required />
                        </div>
                        <button type="submit" className="btn btn-outline-success btn-lg" id={Styles.register}>Register</button>
                    </form>
                </div>
            </div>
        </section>
    )

    function numberDisplay() {
        let txt = document.getElementById('phone');
        txt.innerHTML = "Number Should be without +91";
    }

    function passDisplay() {
        let txt = document.getElementById('pass');
        txt.innerHTML = "Password should be of atleast length 6";
    }

};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, loadUser })(Register);