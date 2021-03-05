import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../RelatedOutfit/StarRating.jsx';

const ProductInfo = (props) => {

  var average = (obj) => {
    var total = 0;
    var count = 0;
    for (var key in obj) {
      count += Number(obj[key]);
      total += Number(key * obj[key]);
    }
    return {
      average: Number((total / count).toFixed(2)),
      count: count
    }
  };

  const ratingData = average(props.ratings);

  return (
    <div className="productInfo">
      <div id="productInfoRating"> 
        <div id="overviewRating">
          <StarRating rating={ratingData.average}/>
        </div>
        {` - Read all ${ratingData.count} reviews`}
      </div>
      <div id="productInfoCategory">{props.product.category}</div>
      <div id="productInfoName">{props.product.name}</div>
      <div id="productInfoPrice">${props.currentStyle.original_price}</div>
    </div>
  )

  ProductInfo.propTypes = {
    ratings: PropTypes.object,
    product: PropTypes.object,
    currentStyle: PropTypes.object
  }
}

export default ProductInfo;

// <div id="productInfoRating">{ratingData.average} - Read all {ratingData.count} reviews</div>