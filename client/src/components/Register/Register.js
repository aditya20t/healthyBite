import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';


const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        password2: ''
    });

    const { name, phone, password, password2 } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            props.setAlert('Password not match', 'danger');
        } else {
            props.register({name, phone, password});
        }
    }

    if(props.isAuthenticated) {
        return <Redirect to='/' />
    }

    return(
        <Fragment>
                <h1>Create your account</h1>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input className="form-control" placeholder="Enter name" name="name" value={name} onChange={e => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Enter phone"  name="phone" value={phone} onChange={e => onChange(e)} size='10' required/>
                        <small className='form-text'>Enter number without +91</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter password"  name="password" value={password} onChange={e => onChange(e)} required/>
                        <small className='form-text'>Enter password of length 6 and above</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter password again"  name="password2" value={password2} onChange={e => onChange(e)} required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                
                
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);