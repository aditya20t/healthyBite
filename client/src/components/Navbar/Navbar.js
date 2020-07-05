import React, {Fragment} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartDropdown from '../Cart-dropdown/CartDropdown'
import { logout } from '../../actions/auth';
import { selectCartItemsCount } from '../../selectors/cart';
import { toggleCartHidden } from '../../actions/cart';
import  style from './Navbar.module.css';

const Navbar = ({auth: {isAuthenticated , loading}, logout, toggleCartHidden, hidden, itemCount}) => {
    let items = JSON.parse(window.localStorage.getItem('items'));
    itemCount = items ? items.length : 0;
    const authLinks = (
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link  " to="/profile"><i className="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                <span>
                    <Link className="nav-link" onClick={toggleCartHidden} ><i className="fas fa-shopping-cart"></i> Cart</Link>
                    <span className={style.cartNumber}>{itemCount}</span>
                </span>    
                </li>
                <li className="nav-item">
                    <Link className="nav-link " onClick={logout} to= '/'><i className="fa fa-sign-out-alt"></i> Logout</Link>
                </li>
            </ul>
            {!hidden ? <CartDropdown /> : null}
        </div>
    );

    const guestLinks = (
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link " to="/login"><i className="fa fa-sign-in-alt"></i> Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/register"><i className="fa fa-user-plus"></i> Register</Link>
                </li>
            </ul>
        </div>
        
    );

    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <Link to='/' className='navbar-logo ' >Healthy Bite</Link>
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
    hidden: state.cart.hidden,
    itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, {logout, toggleCartHidden })(Navbar);