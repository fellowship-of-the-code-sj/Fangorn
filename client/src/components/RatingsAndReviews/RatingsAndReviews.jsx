import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

import Review from './Review.jsx'

function RatingsAndReviews(props) {
  const [starSort, setStarSort] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
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

  const sortByStar = (star, sort) => {
    var newStarSort = starSort;
    if (sort) {
      newStarSort[star] = true;
    } else {
      newStarSort[star] = false;
    }
    setStarSort(newStarSort);
  }

  return (
    <div className="ratings-and-reviews">
      <h3>Ratings and Reviews</h3><br></br>
      <Ratings sortByStar={sortByStar} metaObject={metaObject} />
      <ReviewsList starSort={starSort} metaObject={metaObject} productID={props.productID} />
    </div>
  )
}

export default RatingsAndReviews