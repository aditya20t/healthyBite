import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../../../actions/products";

const EditProduct = ({createProduct, history, item, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    marketPrice: "",
    hbPrice: "",
    stock: "",
  });

  useEffect(() => {
    setFormData({
        name: loading || !item.name ? '':item.name,
        image: loading || !item.image ? '':item.image,
        marketPrice: loading || !item.marketPrice ? '':item.marketPrice,
        hbPrice: loading || !item.hbPrice ? '':item.hbPrice,
        stock: loading || !item.stock ? '':item.stock
    });
}, [loading]);

  const { name, image, marketPrice, hbPrice, stock } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(formData, history, true);
  };

  return (
    <div>
      <h1>Edit a product</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            name="image"
            value={image}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter market price"
            name="marketPrice"
            value={marketPrice}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter HB Price"
            name="hbPrice"
            value={hbPrice}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter stock"
            name="stock"
            value={stock}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Edit Product"
          />
        </div>
      </form>
    </div>
  );
};

EditProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    item: state.product.item,
    loading: state.product.loading
});

export default connect(mapStateToProps, { createProduct })(withRouter(EditProduct));
