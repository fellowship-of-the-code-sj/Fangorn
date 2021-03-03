import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';

import Review from './Review.jsx'

function RatingsAndReviews() {


  return (
    <div className="ratings-and-reviews">
      <Ratings />
      <ReviewsList />
    </div>

  )
}

export default RatingsAndReviews