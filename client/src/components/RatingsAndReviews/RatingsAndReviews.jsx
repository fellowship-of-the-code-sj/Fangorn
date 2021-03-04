import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';

import Review from './Review.jsx'

function RatingsAndReviews(props) {


  return (
    <div className="ratings-and-reviews">
      <h3>Ratings and Reviews</h3><br></br>
      <Ratings />
      <ReviewsList productID={props.productID} />
    </div>

  )
}

export default RatingsAndReviews