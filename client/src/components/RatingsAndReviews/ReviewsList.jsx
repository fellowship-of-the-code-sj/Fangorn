import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReviewsList() {

  const [list, setList] = useState([{
    "review_id": 111380,
    "rating": 4,
    "summary": "This product was ok!",
    "recommend": true,
    "response": "this is a response",
    "body": "I really did not like this product solely because I am tiny and do not fit into it.",
    "date": "2019-01-11T00:00:00.000Z",
    "reviewer_name": "mymainstreammother",
    "helpfulness": 2,
    "photos": ["http://www.clker.com//cliparts/3/m/v/Y/E/V/small-red-apple-hi.png", "https://www.pinclipart.com/picdir/middle/167-1677865_facebook-button-image-facebook-small-icon-png-clipart.png"]
  }]);
  // make api call to update reviewsList

  const getList = function () {
    axios.get('/', (response) => {
      setList(response.body);
    })
  }

  const handleNewReview = (event) => {
    // call api and send new review, then update state
  }

  return (
    <div className="reviews-list">
      {list.map((review) => {
        return <Review key={review.review_id} review={review} />
      })}
    </div>
  )
}

export default ReviewsList;