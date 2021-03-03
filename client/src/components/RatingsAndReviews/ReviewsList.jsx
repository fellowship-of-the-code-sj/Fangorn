import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReviewsList(props) {

  const [list, setList] = useState([]);
  const [hasFetchedList, willFetchList] = useState(false);

  // make api call to update reviewsList
  const getList = function () {
    axios.get('/RatingsAndReviews/getAll', {
      params: {
        page: 1,
        count: 5,
        sort: 'newest',
        product_id: props.productID
      }
    })
      .then((response) => {
        console.log('setting list to be: ', response.data)
        setList(response.data);
      })
  }

  const handleNewReview = (event) => {
    // call api and send new review, then update state
  }

  useEffect(() => {
    if (!hasFetchedList) {
      getList()
      willFetchList(true);
    }
  })

  return (
    <div className="reviews-list">
      {list.map((review) => {
        return <Review key={review.review_id} review={review} />
      })}
    </div>
  )
}

export default ReviewsList;