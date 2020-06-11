import React, {Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import  style from './Navbar.module.css';

const Navbar = ({auth: {isAuthenticated , loading}, logout}) => {

    const authLinks = (
        <div className={style.items}>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile"><i class="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart"><i class="fas fa-shopping-cart"></i> Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={logout} to= '/'><i class="fa fa-sign-out-alt"></i> Logout</Link>
                </li>
            </ul>
        </div>
    );

    const guestLinks = (
        <div className={style.items}>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login"><i class="fa fa-sign-in-alt"></i> Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register"><i class="fa fa-user-plus"></i> Register</Link>
                </li>
            </ul>
        </div>
        
    );

    return (
        <nav className="navbar navbar-expand-sm bg-dark">
            <Link to='/' className='navbar-logo' >Healthy Bite</Link>
            <div>
            { !loading && (<Fragment >{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
            </div>
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);