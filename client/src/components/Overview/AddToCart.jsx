import React from 'react';
import PropTypes from 'prop-types';

const AddToCart = (props) => {
  const createQuantities = (obj) => {
    let quantities = [];
    for (let key in obj) {
      quantities.push(obj[key].quantity)
    }
    return quantities;
  }
  const quantities = createQuantities(props.skus);

  const createSizes = (obj) => {
    let sizes = [];
    for (let key in obj) {
      sizes.push(obj[key].size)
    }
    return sizes;
  }
  const sizes = createSizes(props.skus);


  return (
    <div className="addToCart">
      <select id="sizeSelect">
        <option>Select Size</option>
      </select>
      <select id="quantitySelect">
        <option>-</option>
      </select>
      <button id="addToCartButton">Add To Cart +</button>
    </div>
  )
  AddToCart.propTypes = {
    skus: PropTypes.object
  }
};

export default AddToCart;