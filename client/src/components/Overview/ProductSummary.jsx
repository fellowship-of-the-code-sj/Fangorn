import React from 'react';
import PropTypes from 'prop-types';

const ProductSummary = (props) => {
  return (
    <div className="productSummary">
      <div id="productOverview">
        <h3 id="productOverviewSlogan">{props.product.slogan}</h3>
        <p id="productOverviewDescription">{props.product.description}</p>
      </div>
      <div id="productShare">
        <ion-icon size="large" name="logo-twitter" className="shareIcon"></ion-icon>
        <ion-icon size="large" name="logo-facebook" className="shareIcon"></ion-icon>
        <ion-icon size="large" name="logo-pinterest" className="shareIcon"></ion-icon>
      </div>
    </div>
  )

  ProductSummary.propTypes = {
    product: PropTypes.object
  }
}

export default ProductSummary;