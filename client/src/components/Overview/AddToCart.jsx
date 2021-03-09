import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddToCart = ({ skus }) => {

  const [currentSku, setCurrentSku] = useState({
    sku: null,
    size: '',
    quantities: []
  });
  const [currentQty, setCurrentQty] = useState(null);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const styleSizes = [];
    for (let key in skus) {
      if (skus[key].size) {
        styleSizes.push(skus[key].size)
      }
    }
    setSizes(styleSizes)
    setCurrentSku({
      sku: null,
      size: 'Select Size',
      quantities: []
    });
    setCurrentQty(null);
  }, [skus])

  const sizeChange = (sizeString) => {
    if (sizeString === 'Select Size') {
      setCurrentSku({
        sku: null,
        size: sizeString,
        quantities: []
      })
    }
    for (let key in skus) {
      if (skus[key].size === sizeString) {
        setCurrentSku({
          sku: Number(key),
          size: sizeString,
          quantities: createArray(skus[key].quantity)
        })
        if (!currentQty) {
          setCurrentQty(1)
        }
      }
    }
  }

  const quantityChange = (qtyString) => {
    setCurrentQty(Number(qtyString));
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
      {sizes.length > 0 ?
        <select 
          id="sizeSelect"
          onChange={(e) => {sizeChange(e.target.value)}}>
          <option>Select Size</option>
          {Object.keys(skus).map((key, index) => (
            <option key={key}>{skus[key].size}</option>
          ))}
        </select> :
        <select id="sizeSelect" disabled><option>OUT OF STOCK</option></select>
      }
      {currentSku.quantities.length > 0 ? 
        <select
          id="quantitySelect"
          onChange={(e) => {quantityChange(e.target.value)}}>
          {currentSku.quantities.map((quantity, i) => (
            <option key={i}>{quantity}</option>
          ))}
        </select> :
        <select id="quantitySelect"><option>-</option></select>
      }
      <button id="addToCartButton"
        onClick={(e) => {event.preventDefault(); console.log({sku: currentSku.sku, quantity: currentQty})}}
      >ADD TO CART +</button>
    </div>
  )
  AddToCart.propTypes = {
    skus: PropTypes.object
  }
};

export default AddToCart;