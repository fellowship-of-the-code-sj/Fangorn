import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import React, { useState, useEffect } from 'react';

function ReviewsList() {

  const [list, updateList] = useState([]);
  // make api call to update reviewsList

  const handleNewReview = (event) => {
    // call api and send new review, then update state
  }

  return (
    <div className="reviews-list">
      {/* map reviews list */}
    </div>
  )
}

export default ReviewsList;