import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const AddToCart = (props) => {

  const [ quantity, setQuantity ] = useState(null);
  const [ quantities, setQuantities ] = useState([]);

  const getQuantity = (size) => {
    for (let key in props.skus) {
      if (props.skus[key].size === size) {
        setQuantity(props.skus[key].quantity)
        setQuantities(createArray(props.skus[key].quantity))
      }
    }
  }

  const createArray = (qty) => {
    let quantities = [];
    if (qty < 15) {
      for (let i = 1; i <= qty; i++) {
        quantities.push(i);
      }
    } else {
      for (let i = 1; i <= 15; i++) {
        quantities.push(i);
      }
    }
    return quantities;
  }

  return (
    <div className="addToCart">
      <select 
        id="sizeSelect"
        onChange={(event) => {getQuantity(event.target.value)}}
      >
        <option>Select Size</option>
        {props.skus ?
          Object.keys(props.skus).map((key, index) => (
            <option key={key}>{props.skus[key].size}</option>
          )) : null
        }
      </select>
      <select id="quantitySelect">
        {quantity ?
          quantities.map((qty, i) => (
            <option key={qty}>{qty}</option>
          )) : 
          <option>-</option>
        }
      </select>
      <button id="addToCartButton">Add To Cart +</button>
    </div>
  )
  AddToCart.propTypes = {
    skus: PropTypes.object
  }
};

export default AddToCart;