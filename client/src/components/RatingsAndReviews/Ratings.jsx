import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ratings(props) {

  const [metaObject, setMetaObject] = useState({
    recommended: {
      true: 0,
      false: 0
    },
    ratings: {},
    characteristics: {}
  })
  const [fetchedMetaObject, willFetchMetaObject] = useState(false);

  const getMetaObject = () => {
    var ratingObject = {};
    axios.get('/RatingsAndReviews/getMeta?product_id=13027')
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

  const getAvgRating = (request) => {
    let numReviews = 0;
    let ratingSum = 0;

    var key;
    for (key in metaObject.ratings) {
      ratingSum += metaObject.ratings[key] * key
      numReviews += metaObject.ratings[key] * 1
    }

    var avgRating = (ratingSum / numReviews);
    if (isNaN(avgRating)) {
      avgRating = 0;
    }

    if (request === 'avgRating') {
      return Math.round(avgRating * 10) / 10
    }
    if (request === 'ratingPercentage') {
      console
      return (avgRating / 5) * 100 + '%'
    }
  }

  const getRecommendPercentage = () => {
    let numReccs = 0;
    if (metaObject.recommended.true) {
      numReccs += metaObject.recommended.true * 1;
    }
    if (metaObject.recommended.false) {
      numReccs += metaObject.recommended.false * 1;
    }
    if (metaObject.recommended.true) {
      return ((metaObject.recommended.true / numReccs) * 100);
    } else {
      return 0;
    }
  }

  const getRatingProportion = (request) => {
    let numReviews = 0;
    for (var i = 1; i <= 5; i++) {
      if (metaObject.ratings[i] !== undefined) {
        numReviews += metaObject.ratings[i] * 1
      }
    }

    var outputObj = {
      1: (metaObject.ratings['1'] / numReviews) * 100 + '%',
      2: (metaObject.ratings['2'] / numReviews) * 100 + '%',
      3: (metaObject.ratings['3'] / numReviews) * 100 + '%',
      4: (metaObject.ratings['4'] / numReviews) * 100 + '%',
      5: (metaObject.ratings['5'] / numReviews) * 100 + '%'
    }

    if (outputObj[request] === "NaN%") {
      return '0%';
    }
    return outputObj[request];
  }

  return (
    <div className="ratings">
      <div className="rating-summary">
        <span className="rating-number">{getAvgRating('avgRating')}</span>
        <div className="rating-stars">
          <div className="rating-sprite">
            <span style={{ "width": getAvgRating('ratingPercentage') }} className="rating-sprite-fill"></span>
          </div>
        </div>
      </div>
      <div className="recommend-percentage">{getRecommendPercentage()}% of reviews recommend this product</div>
      <div className="rating-proportions">
        {/*5 stars*/}
        <div className="rating-proportion">
          <span className="star-label">5 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(5) }}></span>
          </div>
        </div>
        {/*4 stars*/}
        <div className="rating-proportion">
          <span className="star-label">4 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(4) }}></span>
          </div>
        </div>
        {/*3 stars*/}
        <div className="rating-proportion">
          <span className="star-label">3 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(3) }}></span>
          </div>
        </div>
        {/*2 stars*/}
        <div className="rating-proportion">
          <span className="star-label">2 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(2) }}></span>
          </div>
        </div>
        {/*1 stars*/}
        <div className="rating-proportion">
          <span className="star-label">1 star</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(1) }}></span>
          </div>
        </div>

      </div>
      <br></br><br></br>
      <div className="characteristics">
        {
          metaObject.characteristics.Size ? <div className="characteristic">Size
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Size.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too small</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "113px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "230px" }}>Too large</span>
          </div> : <div></div>
        }
        {
          metaObject.characteristics.Width ? <div className="characteristic">Width
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Width.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too skinny</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "106px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "225px" }}>Too wide</span>
          </div> : <div></div>
        }
        {
          metaObject.characteristics.Comfort ? <div className="characteristic">Comfort
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Comfort.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Uncomfortable</span>
            <span className="characteristic-bar-label-right" style={{ "left": "250px" }}>Perfect</span>
          </div> : <div></div>
        }
        {
          metaObject.characteristics.Quality ? <div className="characteristic">Quality
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Quality.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Poor</span>
            <span className="characteristic-bar-label-right" style={{ "left": "315px" }}>Great</span>
          </div> : <div></div>
        }
        {
          metaObject.characteristics.Length ? <div className="characteristic">Length
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Length.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too short</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "110px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "230px" }}>Too long</span>
          </div> : <div></div>
        }
        {
          metaObject.characteristics.Fit ? <div className="characteristic">Fit
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (metaObject.characteristics.Fit.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Poor</span>
            <span className="characteristic-bar-label-right" style={{ "left": "315px" }}>Great</span>
          </div> : <div></div>
        }
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default Ratings
/*
{
  "product_id": "13029",
  "ratings": {
      "1": "1",
      "5": "1"
  },
  "recommended": {
      "false": "1",
      "true": "1"
  },
  "characteristics": {
      "Size": {
          "id": 43638,
          "value": "2.5000000000000000"
      },
      "Width": {
          "id": 43639,
          "value": "4.5000000000000000"
      },
      "Comfort": {
          "id": 43640,
          "value": "5.0000000000000000"
      },
      "Quality": {
          "id": 43641,
          "value": "3.5000000000000000"
      }
  }
}
*/