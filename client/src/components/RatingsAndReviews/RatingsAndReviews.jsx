import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

import Review from './Review.jsx'

function RatingsAndReviews(props) {
  const [tracker, setTracker] = useState(0);
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

  const toggleStarSort = (star) => {
    var newStarSort = starSort;
    if (starSort[star]) {
      newStarSort[star] = false;
    } else {
      newStarSort[star] = true;
    }
    setTracker(tracker + 1);
    setStarSort(newStarSort);
  }

  return (
    <div className="ratings-and-reviews">
      <h3>Ratings and Reviews</h3><br></br>
      <a name="randr" />
      <Ratings toggleStarSort={toggleStarSort} metaObject={metaObject} />
      <ReviewsList tracker={tracker} starSort={starSort} metaObject={metaObject} productID={props.productID} />
    </div>
  )
}

export default RatingsAndReviews