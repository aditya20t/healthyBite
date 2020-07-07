import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartDropdown from '../Cart-dropdown/CartDropdown'
import { logout } from '../../actions/auth';
import { selectCartItemsCount } from '../../selectors/cart';
import { toggleCartHidden } from '../../actions/cart';
import Styles from './Navbar.module.css';
import ClassNames from 'classnames';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, toggleCartHidden, hidden, itemCount }) => {
    let items = JSON.parse(window.localStorage.getItem('items'));
    itemCount = items ? items.length : 0;
    const authLinks = (
        <Fragment>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile"><i className="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                    <span>
                        <Link className="nav-link" onClick={toggleCartHidden} ><i className="fas fa-shopping-cart"></i> Cart</Link>
                        <span className={Styles.cartNumber}>{itemCount}</span>
                    </span>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " onClick={logout} to='/'><i className="fa fa-sign-out-alt"></i> Logout</Link>
                </li>
            </ul>
            {!hidden ? <CartDropdown /> : null}
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link " to="/login"><i className="fa fa-sign-in-alt"></i> Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/register"><i className="fa fa-user-plus"></i> Register</Link>
                </li>
            </ul>
        </Fragment>

    );
        var cx = ClassNames.bind(Styles);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark"  style={{ backgroundColor: "rgba(53, 10, 79, .7)"}}>
            <div className="container">
                <Link to='/' className='navbar-brand' >
                    <img src={require('./Images/logo1.jpeg')} className={Styles.logo} />
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    {!loading && (<Fragment >{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                </div>
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

export default connect(mapStateToProps, { logout, toggleCartHidden })(Navbar);