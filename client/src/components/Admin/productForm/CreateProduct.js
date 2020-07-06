import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../../../actions/products";

const CreateProduct = ({ createProduct, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    marketPrice: "",
    hbPrice: "",
    stock: "",
  });

  const { name, image, marketPrice, hbPrice, stock } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(formData, history);
  };

  return (
    <div className='container'>
      <h1>Add a product</h1>
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
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

export default connect(null, { createProduct })(withRouter(CreateProduct));
