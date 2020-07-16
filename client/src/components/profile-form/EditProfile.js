import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getProfile } from '../../actions/profile'
import Styles from './EditProfile.module.css'

const EditProfile = ({ profile: { profile, loading }, createProfile, getProfile, history }) => {
    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        gender: '',
    });

    useEffect(() => {
        getProfile();

        setFormData({
            address: loading || !profile.address ? '' : profile.address,
            pincode: loading || !profile.pincode ? '' : profile.pincode,
            gender: loading || !profile.gender ? '' : profile.gender
        });
    }, [loading]);

    const { address, pincode, gender } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <div className="container">
            <p className={Styles.heading} >Edit Your Profile</p>
            <form className='form' onSubmit={e => onSubmit(e)} id={Styles.form}>
                <div className="form-group">
                    <input className="form-control" placeholder="Enter Your Address" name="address" value={address} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Enter Pincode" name="pincode" value={pincode} onChange={e => onChange(e)} size='6' required />
                    <small className='form-text'>Pincode should be of 6 digits</small>
                </div>
                <div>
                    <span>Gender:</span>&nbsp;&nbsp;&nbsp;
                    <input type="radio" id="male" name="gender" value={'male'} onChange={e => onChange(e)} />
                    <label htmlFor="male">&nbsp;Male</label>&nbsp;&nbsp;&nbsp;
                    <input type="radio" id="female" name="gender" value={'female'} onChange={e => onChange(e)} />
                    <label htmlFor="female">&nbsp;Female</label>&nbsp;&nbsp;&nbsp;
                    <input type="radio" id="other" name="gender" value={'other'} onChange={e => onChange(e)} />
                    <label htmlFor="other">&nbsp;Other</label>
                </div>
                <div className={Styles.button}>
                    <input type="submit" className="btn btn-primary" value="Create Profile" />
                </div>
            </form>
        </div>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getProfile })(withRouter(EditProfile));
