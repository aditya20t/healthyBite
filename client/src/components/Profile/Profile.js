import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import Styles from './Profile.module.css';

const Profile = ({ getProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
    useEffect(() => {
        getProfile();
    }, []);
    return loading && profile === null ? <Spinner /> : <section className={Styles.container}>
        <div className="row">
            <div class="col-lg-3 col-md-3 col-sm-0" id={Styles.leftContent}>
                <div className="card" >
                    <div className="card-body" >
                        <p className="lead">
                            <i className='fas fa-user'></i> Welcome<br /> {user && user.name}
                        </p>
                        <Link to='/edit-profile' className='btn btn-primary my-1'> Edit Profile </Link>
                        <div>
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"></i> Delete my account
                            </button><br />
                            {user.is_admin ? <Link to='/admin/dashboard' className='btn btn-outline-warning mt-1' >Admin dashboard</Link> : null}
                        </div>
                    </div>

                </div>

            </div>
            <div class="col-lg-9 col-md-9 col-sm-12 ">
                {profile !== null ? <Fragment>
                    <h3 className={Styles.heading}>Here is your Profile data</h3>
                    <p className={Styles.para}><strong>Address: </strong>{profile.address}</p>
                    <p className={Styles.para}><strong>Pincode: </strong>{profile.pincode}</p>
                    <p className={Styles.para}><strong>Gender: </strong>{profile.gender}</p>
                    <br />

                </Fragment> : <Fragment>
                        <p>You have not yet setup your profile.</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'> Create Profile </Link>
                    </Fragment>}
            </div>
        </div>
    </section>;
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