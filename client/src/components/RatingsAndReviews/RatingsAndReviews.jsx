import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

import Review from './Review.jsx'

function RatingsAndReviews(props) {
  const [starSort, setStarSort] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });
  const [fetchedMetaObject, willFetchMetaObject] = useState(false);
  const [metaObject, setMetaObject] = useState({
    recommended: {
      true: 0,
      false: 0
    },
    ratings: {},
    characteristics: {}
  })

  const getMetaObject = () => {
    var ratingObject = {};
    axios.get(`/RatingsAndReviews/getMeta?product_id=${props.productID}`)
      .then((response) => {
        setMetaObject(response.data)
      })
  }

  useEffect(() => {
    if (!fetchedMetaObject) {
      getMetaObject();
      willFetchMetaObject(true);
    }

  })

  const toggleStarSort = (star) => {
    var newStarSort = starSort;
    if (starSort[star]) {
      newStarSort[star] = false;
    } else {
      newStarSort[star] = true;
    }
    console.log('newStarSort: ', newStarSort)
    setStarSort(newStarSort);
  }

  return (
    <div className="ratings-and-reviews">
      <h3>Ratings and Reviews</h3><br></br>
      <Ratings toggleStarSort={toggleStarSort} metaObject={metaObject} />
      <ReviewsList starSort={starSort} metaObject={metaObject} productID={props.productID} />
    </div>
  )
}

export default RatingsAndReviews