import React from 'react';
import PropTypes from 'prop-types';


var StarRating = ({ rating }) => {
  return (

    <div className="star-ratings">
    <div style={ { width: `${rating}%` } } className="star-top">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    <div className="star-bottom">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    </div>
  )
}

export default StarRating;

StarRating.propTypes = {
  raing: PropTypes.string
}