import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ProductItem from "../ProductItem/ProductItem";
import Styles from "./Landing.module.css";
import { getProducts } from "../../actions/products";

const Landing = ({ getProducts, product: { products, loading } }) => {
  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
        </ul>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("./1.jpeg")} className={Styles.image} />
          </div>
          <div className="carousel-item">
            <img src={require("./2.jpeg")} className={Styles.image} />
          </div>
          <div className="carousel-item">
            <img src={require("./3.jpeg")} className={Styles.image} />
          </div>
        </div>
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
      <div className={Styles.productContainer}>
        <p className={Styles.subheading}>Popular</p>
        <hr />
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p>Server Down</p>
        )}
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(Landing);
