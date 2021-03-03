import React, { useState, useEffect } from 'react';
import StyleSelector from './StyleSelector.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductSummary from './ProductSummary.jsx';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
import PropTypes from 'prop-types';
const port = 404;

const Overview = (props) => {

  const [ product, setProduct ] = useState({});
  const [ styles, setStyles ] = useState([]);
  const [ ratings, setRatings ] = useState({});
  const [ currentStyle, setCurrentStyle ] = useState({});

  useEffect(() => {
    axiosHelper.get(`http://localhost:${port}/Overview`, {itemID: props.productID}, (results) => {
      setProduct(results.data.productObj);
      setStyles(results.data.stylesArr);
      setRatings(results.data.ratingsObj);
      setCurrentStyle(results.data.stylesArr[0]);
    })
  }, [])

  return (
    <div className="overview">
      <h1>Overview:</h1>
      <ProductInfo 
        product={ product }
        currentStyle={ currentStyle }
        ratings={ ratings }
      />
      <StyleSelector
        styles={ styles }
        currentStyle={ currentStyle }
        handleStyleChange={index => setCurrentStyle(styles[index])}
      />
      <ProductSummary
        product={ product }
      />
    </div>
  )

  Overview.propTypes = {
    productID: PropTypes.number
  }
}

export default Overview;