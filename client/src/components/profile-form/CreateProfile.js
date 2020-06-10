import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createProfile} from '../../actions/profile'

const CreateProfile = ({createProfile, history }) => {
    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        gender: '',
    });

    const { address, pincode, gender } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <div>
            <h1>Create Your Profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input className="form-control" placeholder="Enter address" name="address" value={address} onChange={e => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Enter Pincode"  name="pincode" value={pincode} onChange={e => onChange(e)} size='6' required/>
                        <small className='form-text'>Enter pincode of 6 digits</small>
                    </div>
                    <div>
                    <h6>Gender:</h6>
                    <input type="radio" id="male" name="gender" value={'male'} onChange={e => onChange(e)} />
                    <label htmlFor="male">Male</label><br/>
                    <input type="radio" id="female" name="gender" value={'female'} onChange={e => onChange(e)} />
                    <label htmlFor="female">Female</label><br/>
                    <input type="radio" id="other" name="gender" value={'other'} onChange={e => onChange(e)} />
                    <label htmlFor="other">Other</label>
                    <br/>
                    <input type="submit" className="btn btn-primary" value="Create Profile" />
                    </div>
            </form>
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}



export default connect(null, {createProfile})(withRouter(CreateProfile));
