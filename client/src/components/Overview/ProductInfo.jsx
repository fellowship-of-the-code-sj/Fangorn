import React from 'react';

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
      <h3>{ratingData.average} - Read all {ratingData.count} reviews</h3>
      <h3>{props.product.category}</h3>
      <h1>{props.product.name}</h1>
      <h3>${props.style.original_price}</h3>
    </div>
  )
}

export default ProductInfo;