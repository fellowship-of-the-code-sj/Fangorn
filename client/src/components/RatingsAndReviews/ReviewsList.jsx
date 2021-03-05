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
        count: 10,
        sort: 'newest',
        product_id: props.productID
      }
    })
      .then((response) => {
        setList(response.data);
        setVisibleList(response.data.slice(0, 2))
      })
  }

  const handleNewReview = (event) => {
    // call api and send new review, then update state
  }

  const showForm = () => {
    var modal = document.getElementById('newReviewForm');
    modal.style.display = "block";
  }

  const showMoreReviews = () => {
    setVisibleList(list.slice(0, visibleList.length + 2));
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
        list.length > visibleList.length ?
          <div className="review-list-buttons">
            <button className="show-more-reviews-button" onClick={showMoreReviews}>Show more reviews</button>
            <button className="new-review-button" onClick={showForm}>Leave a review</button>
          </div> :
          <div className="review-list-buttons">
            <button className="new-review-button" onClick={showForm}>Leave a review</button>
          </div>
      }
      <NewReview productID={props.productID} />
    </div >
  )
}

export default ReviewsList;