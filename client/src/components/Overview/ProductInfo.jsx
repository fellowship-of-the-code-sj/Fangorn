import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../RelatedOutfit/StarRating.jsx';
import captureOverview from '../../hoc/captureOverview';

const ProductInfo = ({ product, currentStyle, ratings, logger }) => {

  var average = (obj) => {
    var total = 0;
    var count = 0;
    for (var key in obj) {
      count += Number(obj[key]);
      total += Number(key * obj[key]);
    }
    return {
      average: Number((Math.round((total / count) * 4) / 4).toFixed(2)),
      count: count
    }
  };

  const ratingData = average(ratings);

  return (
    <div className="productInfo">
      {ratingData.count > 0 ? 
        <div id="productInfoRating"> 
          <div id="overviewRating">
            <StarRating rating={ratingData.average}/>
          </div>
          &nbsp;-&nbsp;
          <a href="#randr" onClick={e => {logger(e)}}>Read all&nbsp;{ratingData.count}&nbsp;reviews</a>
        </div> : null
      }
      <div id="productInfoCategory">{product.category}</div>
      <div id="productInfoName">{product.name}</div>
      { currentStyle.sale_price ?
        <div id="productInfoPrice"><span id="salePrice">${currentStyle.sale_price}</span> <span id="originalPrice">${currentStyle.original_price}</span></div> :
        <div id="productInfoPrice">${currentStyle.original_price}</div>
      }
    </div>
  )

  ProductInfo.propTypes = {
    ratings: PropTypes.object,
    product: PropTypes.object,
    currentStyle: PropTypes.object,
    logger: PropTypes.func
  }
}

export default captureOverview(ProductInfo);