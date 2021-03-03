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
        <img 
          src="https://www.vhv.rs/dpng/d/146-1461722_twitter-circle-twitter-logo-png-transparent-png.png"
          alt="Twitter Logo"
          height="50"
          width="50"
        />
        <img
          src="https://www.vhv.rs/dpng/d/0-464_facebook-icon-png-circle-transparent-png.png" 
          alt="Facebook Logo"
          height="50"
          width="50"
        />
        <img
          src="https://www.clipartmax.com/png/full/203-2036493_a-link-to-pinterest-page-pinterest-circle-pinterest-icon.png" 
          alt="Pinterest Logo"
          height="50"
          width="50"
        />
      </div>
    </div>
  )

  ProductSummary.propTypes = {
    product: PropTypes.object
  }
}

export default ProductSummary;