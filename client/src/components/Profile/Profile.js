import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const Profile = ({ getProfile, auth: {user}, profile: { profile, loading }, deleteAccount }) => {
    useEffect(() => {
        getProfile();
    }, []);
    return loading && profile === null ? <Spinner />: <Fragment>
        <h1 className='large text-primary'>Profile</h1>
        <p className="lead">
            <i className='fas fa-user'></i> Welcome { user && user.name }
        </p>
        { profile !== null ? <Fragment>
        <h3>Here is your Profile data</h3>
        <p><b>Address: </b>{profile.address}</p>
        <p><b>Pincode: </b>{profile.pincode}</p>
        <p><b>Gender: </b>{profile.gender}</p>
        <br/>
        <Link to='/edit-profile' className='btn btn-primary my-1'> Edit Profile </Link>
        <div>
            <button className="btn btn-danger" onClick = {() => deleteAccount()}>
                <i className="fas fa-user-minus"></i> Delete my account
            </button>
            {user.is_admin ? <Link to='/admin/dashboard' className='btn btn-outline-primary' >Admin dashboard</Link> : null}
        </div>
        </Fragment> : <Fragment>
            <p>You have not yet setup your profile.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'> Create Profile </Link>
        </Fragment>}
    </Fragment>; 
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(Profile);