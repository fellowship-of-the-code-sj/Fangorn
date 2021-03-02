import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo.jsx';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
const port = 404;

const Overview = (props) => {

  const [ product, setProduct ] = useState({});
  const [ styles, setStyles ] = useState({});
  const [ ratings, setRatings ] = useState({});
  const [ style, setStyle ] = useState({});

  useEffect(() => {
    axiosHelper.get(`http://localhost:${port}/Overview`, {itemID: props.productID}, (results) => {
      setProduct(results.data.productObj);
      setStyles(results.data.stylesArr);
      setRatings(results.data.ratingsObj);
      setStyle(results.data.stylesArr[0]);
    })
  }, [product])

  return (
    <div className="overview">
      <h1>Overview:</h1>
      <ProductInfo 
        product={ product }
        style={ style }
        ratings={ ratings }
      />
    </div>
  )
}

export default Overview;