import React from 'react';
import PropTypes from 'prop-types';


var StarRating = ({ rating }) => {

  rating = rating? parseFloat(rating)*20 : 0;

  return (
    <React.Fragment>
      <div style={ { width: `${rating}%` } } className="star-top">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div className="star-bottom">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    </React.Fragment>
  )
}

export default StarRating;

StarRating.propTypes = {
  rating: PropTypes.string
}