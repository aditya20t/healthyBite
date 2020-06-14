import React, {Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartDropdown from '../Cart-dropdown/CartDropdown'
import { logout } from '../../actions/auth';
import { toggleCartHidden } from '../../actions/cart';
//import  style from './Navbar.module.css';

const Navbar = ({auth: {isAuthenticated , loading}, logout, toggleCartHidden, hidden}) => {

    const authLinks = (
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link  text-white" to="/profile"><i className="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" onClick={toggleCartHidden} ><i className="fas fa-shopping-cart"></i> Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" onClick={logout} to= '/'><i className="fa fa-sign-out-alt"></i> Logout</Link>
                </li>
            </ul>
            {!hidden ? <CartDropdown /> : null}
        </div>
    );

    const guestLinks = (
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/login"><i className="fa fa-sign-in-alt"></i> Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/register"><i className="fa fa-user-plus"></i> Register</Link>
                </li>
            </ul>
        </div>
        
    );

    return (
        <nav className="navbar navbar-expand-sm bg-dark">
            <Link to='/' className='navbar-logo text-white' >Healthy Bite</Link>
            <div className='ml-auto'>
            { !loading && (<Fragment >{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
            </div>
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    toggleCartHidden: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    hidden: state.cart.hidden
});

export default connect(mapStateToProps, {logout, toggleCartHidden })(Navbar);