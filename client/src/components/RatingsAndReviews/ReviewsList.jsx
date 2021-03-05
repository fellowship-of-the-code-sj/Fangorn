import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReviewsList(props) {

  const [list, setList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);
  const [hasFetchedList, willFetchList] = useState(false);

  // make api call to update reviewsList
  const getList = () => {
    axios.get('/RatingsAndReviews/getAll', {
      params: {
        page: 1,
        count: 5,
        sort: 'newest',
        product_id: props.productID
      }
    })
      .then((response) => {
        setList(response.data);
        setVisibleList(response.data.slice(0, 1))
      })
  }

  const handleNewReview = (event) => {
    // call api and send new review, then update state
  }

  const showMoreReviews = () => {
    setVisibleList(list.slice(0, visibleList.length + 1));
  }

  useEffect(() => {
    if (!hasFetchedList) {
      getList()
      willFetchList(true);
    }
  })

  return (
    <div className="reviews-list">
      {visibleList.map((review) => {
        return <Review key={review.review_id} review={review} />
      })}
      {
        list.length > visibleList.length ? <button className="show-more-reviews-button" onClick={showMoreReviews}>Show more reviews</button> : <div></div>
      }
      {
        visibleList[0] ? <NewReview /> : <div><NewReview /></div>
      }

    </div>
  )
}

export default ReviewsList;