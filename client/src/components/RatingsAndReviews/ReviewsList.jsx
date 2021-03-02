import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReviewsList() {

  const [list, setList] = useState([{
    "review_id": 111380,
    "rating": 4,
    "summary": "This product was ok!",
    "recommend": false,
    "response": "",
    "body": "I really did not like this product solely because I am tiny and do not fit into it.",
    "date": "2019-01-11T00:00:00.000Z",
    "reviewer_name": "mymainstreammother",
    "helpfulness": 2,
    "photos": []
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