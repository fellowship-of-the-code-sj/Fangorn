import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo.jsx';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
const port = 404;

const Overview = (props) => {

  const [ product, setProduct ] = useState({});
  const [ styles, setStyles ] = useState({});
  const [ ratings, setRatings ] = useState({});

  useEffect(() => {
    axiosHelper.get(`http://localhost:${port}/Overview`, {itemID: props.productID}, (data) => {
      console.log(data.data);
    })
  })
  
  return (
    <div className="overview">
      <h1>Overview:</h1>
      <ProductInfo />
    </div>
  )
}

export default Overview;