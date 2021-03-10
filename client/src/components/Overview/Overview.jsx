import React, { useState, useEffect } from 'react';
import StyleSelector from './StyleSelector.jsx';
import ProductInfo from './ProductInfo.jsx';
import AddToCart from './AddToCart.jsx';
import ProductSummary from './ProductSummary.jsx';
import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
import PropTypes from 'prop-types';

const Overview = (props) => {

  const [ product, setProduct ] = useState({});
  const [ styles, setStyles ] = useState([]);
  const [ ratings, setRatings ] = useState({});
  const [ currentStyle, setCurrentStyle ] = useState({});
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ imageIndex, setImageIndex ] = useState(0);

  const handleImageIndexChange = (increment) => {
    let newIndex = imageIndex + increment;
    setImageIndex(newIndex);
  }

  useEffect(() => {
    setProduct(props.productObj);
    setStyles(props.stylesArr);
    setRatings(props.ratingsObj);
    setCurrentStyle(props.stylesArr[0]);
    setImageIndex(0);
  }, [props.productObj])

  const changeView = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="overview">
      { isExpanded ?
        <ExpandedView
          photos={ currentStyle.photos }
          changeView = {changeView}
          imageIndex = {imageIndex}
          setImageIndex = {setImageIndex}
          handleImageIndexChange = {handleImageIndexChange}
        />
      : <DefaultView
          photos={ currentStyle.photos }
          changeView = {changeView}
          imageIndex = {imageIndex}
          setImageIndex = { setImageIndex }
          handleImageIndexChange = {handleImageIndexChange}
        />
      }
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
      <AddToCart
        skus={ currentStyle.skus }
      />
      <ProductSummary
        product={ product }
      />
    </div>
  )

  Overview.propTypes = {
    productID: PropTypes.number,
    productObj: PropTypes.object,
    stylesArr: PropTypes.array,
    ratingsObj: PropTypes.object
  }
}

export default Overview;