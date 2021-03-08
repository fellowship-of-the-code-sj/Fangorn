/* eslint-disable react/prop-types */
import NewReview from './NewReview.jsx'
import Review from './Review.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReviewsList(props) {

  const [starSortTracker, setTracker] = useState({});
  const [list, setList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);
  const [sortQuery, setSortQuery] = useState('relevant')

  // make api call to update reviewsList
  const getList = (sortQuery) => {
    axios.get('/RatingsAndReviews/getAll', {
      params: {
        page: 1,
        count: 50,
        sort: sortQuery,
        product_id: props.productID
      }
    })
      .then((response) => {
        setList(sortByStar(response.data));
        setVisibleList(sortByStar(response.data).slice(0, 2))
      })
  }

  const sortByStar = (list) => {
    var trueSort = props.starSort;
    if (props.starSort[1] === false && props.starSort[2] === false && props.starSort[3] === false && props.starSort[4] === false && props.starSort[5] === false) {
      trueSort = {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
      }
    }
    var filteredList = [];
    for (var i = 0; i < list.length; i++) {
      if (trueSort[list[i].rating]) {
        filteredList.push(list[i])
      }
    }
    return filteredList;
  }

  const isFiltering = () => {
    if (props.starSort[1] === false && props.starSort[2] === false && props.starSort[3] === false && props.starSort[4] === false && props.starSort[5] === false) {
      return false;
    } else {
      return true;
    }
  }

  const whichFilters = () => {
    var output = '';
    for (var i = 1; i <= 5; i++) {
      if (props.starSort[i]) {
        output += ` ${i} star,`
      }
    }
    return output.slice(0, output.length - 1)
  }

  const showForm = () => {
    var modal = document.getElementById('newReviewForm');
    modal.style.display = "block";
  }

  const showMoreReviews = () => {
    setVisibleList(list.slice(0, visibleList.length + 2));
  }

  const handleSortChange = (e) => {
    e.preventDefault();
    setSortQuery(e.target.value);
    getList(e.target.value);
  }

  const ClearFilter = () => {

    return (
      <button style={{ fontSize: "70%", color: "black" }} onClick={props.resetStarSort} >&nbsp;Clear filtering&nbsp;</button>
    )
  }

  useEffect(() => {
    getList(sortQuery);
  }, [props.tracker]);

  return (
    <div className="reviews-list">
      {list.length} reviews, sorted by &nbsp;
      <select id="sortBy" onChange={handleSortChange}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Most helpful</option>
      </select>
      {
        isFiltering() ? <span>, filtering by <br></br><ClearFilter /> {whichFilters()} reviews&nbsp;</span> : <span><br></br><br></br></span>
      }
      <hr></hr>
      <div className="reviews-list-content">
        {visibleList.map((review) => {
          return <Review key={review.review_id} review={review} />
        })}
      </div><br></br>
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
      <NewReview productName={props.productName} metaObject={props.metaObject} productID={props.productID} />
    </div >
  )
}

export default ReviewsList;