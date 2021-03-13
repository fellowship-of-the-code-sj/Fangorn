import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import captureOverview from '../../hoc/captureOverview';

const AddToCart = ({ skus, logger }) => {

  const [selectedSku, setSelectedSku] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [failedAddToCart, setFailedAddToCart] = useState(false)

  useEffect(() => {
    const styleSizes = [];
    for (let key in skus) {
      if (skus[key].size) {
        styleSizes.push(skus[key].size)
      }
    }
    setSizes(styleSizes)
    setSelectedSku(null);
    setSelectedSize('Select Size');
    setSelectedQty(null);
    setQuantities([]);
  }, [skus])

  const sizeChange = (sizeString) => {
    if (sizeString === 'Select Size') {
      setSelectedSku(null);
      setSelectedSize(sizeString)
      setQuantities([]);
    }
    for (let key in skus) {
      if (skus[key].size === sizeString) {
        setSelectedSku(Number(key));
        setSelectedSize(sizeString)
        setQuantities(createArray(skus[key].quantity));
        if (!selectedQty) {
          setSelectedQty(1)
        }
      }
    }
  }

  const quantityChange = (qtyString) => {
    setSelectedQty(Number(qtyString));
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

  const handleAddToCart = () => {
    if (selectedSize === "Select Size") {
      setFailedAddToCart(true);
    } else {
      setFailedAddToCart(false);
      console.log({sku_id: selectedSku, count: selectedQty})
    }
  }

  return (
    <div className="addToCart">
      {sizes.length > 0 ?
        <div id="sizeSelectContainer">
          {failedAddToCart ? <p id="sizeError">Please select size</p> : null}
          <select 
            id="sizeSelect"
            onChange={e => {sizeChange(e.target.value)}}>
            <option>Select Size</option>
            {Object.keys(skus).map((key, index) => (
              <option key={key}>{skus[key].size}</option>
            ))}
          </select> 
        </div> :
        <div id="sizeSelectContainer">
          <select id="sizeSelect" disabled><option>OUT OF STOCK</option></select>
        </div>
      }
      {quantities.length > 0 ? 
        <select
          id="quantitySelect"
          onChange={e => {quantityChange(e.target.value)}}>
          {quantities.map((quantity, i) => (
            <option key={i}>{quantity}</option>
          ))}
        </select> :
        <select id="quantitySelect"><option>-</option></select>
      }
      {sizes.length > 0 ?
      <div id="addToCartButton"
        onClick={e => {e.preventDefault(); handleAddToCart(); logger(e)}}
      >
        <span id="addText">ADD TO CART</span>
        <span id="addPlus">+</span>
      </div> : <div id="addToCartButton"></div>
      }
    </div>
  )
  AddToCart.propTypes = {
    skus: PropTypes.object,
    logger: PropTypes.func
  }
};

export default captureOverview(AddToCart);