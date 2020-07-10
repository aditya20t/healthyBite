import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../../actions/cart";
import styles from "./ProductItem.module.css";

const ProductItem = ({ product, addItem, isAuthenticated }) => {
  const { image, name, marketPrice, hbPrice } = product;
  return (
    <div className={styles.product}>
      <div className={styles.card}>
        <img src={image} alt="new" className={styles.image} />
        <div className={styles.details}>
          <h5 className={styles.productName}>{name}</h5>
          <div className={styles.price}>
            <h6 className={styles.marketPrice}>₹{marketPrice}/kg</h6>
            <h6 className={styles.hbPrice}>₹{hbPrice}/kg</h6>
          </div>
          <div className={styles.button}>
            {isAuthenticated ? (
              <button className="btn btn-dark" onClick={() => addItem(product)}>
                <i className="fa fa-plus"></i> Add to cart
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.protoType = {
  addItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ProductItem);
