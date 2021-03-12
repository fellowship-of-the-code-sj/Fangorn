import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import captureOverview from '../../hoc/captureOverview';

const AddToCart = ({ skus, logger }) => {

  const [currentSku, setCurrentSku] = useState({
    sku: null,
    size: '',
    quantities: []
  });
  const [currentQty, setCurrentQty] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [failedAddToCart, setFailedAddToCart] = useState(false)

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

  const handleAddToCart = () => {
    if (currentSku.size === "Select Size") {
      setFailedAddToCart(true);
    } else {
      setFailedAddToCart(false);
      console.log({sku_id: currentSku.sku, count: currentQty})
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
      {currentSku.quantities.length > 0 ? 
        <select
          id="quantitySelect"
          onChange={e => {quantityChange(e.target.value)}}>
          {currentSku.quantities.map((quantity, i) => (
            <option key={i}>{quantity}</option>
          ))}
        </select> :
        <select id="quantitySelect"><option>-</option></select>
      }
      {sizes.length > 0 ?
      <button id="addToCartButton"
        onClick={e => {e.preventDefault(); handleAddToCart(); logger(e)}}
        >ADD TO CART +
      </button> : <div id="addToCartButton"></div>
      }
    </div>
  )
  AddToCart.propTypes = {
    skus: PropTypes.object,
    logger: PropTypes.func
  }
};

export default captureOverview(AddToCart);