import React, { useState, useEffect } from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

import Review from './Review.jsx'

function RatingsAndReviews(props) {
  const [starSort, setStarSort] = useState(false);
  const [test, setTest] = useState('weiner');
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

  const sortByStar = (star) => {
    setStarSort(star);
  }

  return (
    <div className="ratings-and-reviews">

      <h3>Ratings and Reviews</h3><br></br>
      <Ratings sortByStar={sortByStar} metaObject={metaObject} />
      <ReviewsList metaObject={metaObject} productID={props.productID} />
      <a name="randr"/>

    </div>
  )
}

export default RatingsAndReviews