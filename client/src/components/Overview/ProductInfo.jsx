import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = (props) => {

  var average = (obj) => {
    var total = 0;
    var count = 0;
    for (var key in obj) {
      count += Number(obj[key]);
      total += Number(key * obj[key]);
    }
    return {
      average: total / count,
      count: count
    }
  };

  const ratingData = average(props.ratings);

  return (
    <div className="productInfo">
      <div id="product_info_rating">{ratingData.average} - Read all {ratingData.count} reviews</div>
      <div id="product_info_category">{props.product.category}</div>
      <div id="product_info_name">{props.product.name}</div>
      <div id="product_info_price">${props.currentStyle.original_price}</div>
    </div>
  )

  ProductInfo.propTypes = {
    ratings: PropTypes.object,
    product: PropTypes.object,
    currentStyle: PropTypes.object
  }
}

export default ProductInfo;