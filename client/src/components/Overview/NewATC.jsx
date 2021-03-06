import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ATC = ({ skus }) => {

  const [currentSku, setCurrentSku] = useState({
    size: '',
    quantities: []
  });
  const [currentQty, setCurrentQty] = useState(null);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const styleSizes = [];
    for (let key in skus) {
      if (skus[key].size) {
        skusSizes.push(skus[key].size)
      }
    }
    setSizes(styleSizes)
    setCurrentSku({
      size: '',
      quantities: []
    });
    setCurrentQty(null);
  }, [skus])

  return (
    <div className="addToCart">
      {sizes.length > 0 ?
      <select 
        id="sizeSelect"
        onChange={(event) => (console.log(sizes))}>
        <option>Select Size</option>
        <option>Other</option>
      </select>
      :
      <select id='sizeSelect' disabled><option>OUT OF STOCK</option></select>}
    </div>
  )
  ATC.propTypes = {
    skus: PropTypes.object
  }
};

export default ATC;