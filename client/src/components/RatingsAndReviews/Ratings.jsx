/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ratings(props) {

  const getAvgRating = (request) => {
    let numReviews = 0;
    let ratingSum = 0;

    var key;
    for (key in props.metaObject.ratings) {
      ratingSum += props.metaObject.ratings[key] * key
      numReviews += props.metaObject.ratings[key] * 1
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
    if (props.metaObject.recommended.true) {
      numReccs += props.metaObject.recommended.true * 1;
    }
    if (props.metaObject.recommended.false) {
      numReccs += props.metaObject.recommended.false * 1;
    }
    if (props.metaObject.recommended.true) {
      return Math.round((props.metaObject.recommended.true / numReccs) * 100);
    } else {
      return 0;
    }
  }

  const getRatingProportion = (request) => {
    let numReviews = 0;
    for (var i = 1; i <= 5; i++) {
      if (props.metaObject.ratings[i] !== undefined) {
        numReviews += props.metaObject.ratings[i] * 1
      }
    }

    var outputObj = {
      1: (props.metaObject.ratings['1'] / numReviews) * 100 + '%',
      2: (props.metaObject.ratings['2'] / numReviews) * 100 + '%',
      3: (props.metaObject.ratings['3'] / numReviews) * 100 + '%',
      4: (props.metaObject.ratings['4'] / numReviews) * 100 + '%',
      5: (props.metaObject.ratings['5'] / numReviews) * 100 + '%'
    }

    if (outputObj[request] === "NaN%") {
      return '0%';
    }
    return outputObj[request];
  }

  const handleStarClick = (star, id) => {
    props.toggleStarSort(star)
    var clickedStar = document.getElementById(id);
    if (clickedStar.style.backgroundColor === '') {
      clickedStar.style.backgroundColor = 'gold'
    } else {
      clickedStar.style.backgroundColor = ''
    }
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
          <span onClick={() => { handleStarClick(5, 'starFive') }} id="starFive" className="star-label">5 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(5) }}></span>
          </div>
        </div>
        {/*4 stars*/}
        <div className="rating-proportion">
          <span onClick={() => { handleStarClick(4, 'starFour') }} id="starFour" className="star-label">4 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(4) }}></span>
          </div>
        </div>
        {/*3 stars*/}
        <div className="rating-proportion">
          <span onClick={() => { handleStarClick(3, 'starThree') }} id="starThree" className="star-label">3 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(3) }}></span>
          </div>
        </div>
        {/*2 stars*/}
        <div className="rating-proportion">
          <span onClick={() => { handleStarClick(2, 'starTwo') }} id="starTwo" className="star-label">2 stars</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(2) }}></span>
          </div>
        </div>
        {/*1 stars*/}
        <div className="rating-proportion">
          <span onClick={() => { handleStarClick(1, 'starOne') }} id="starOne" className="star-label">1 star</span>
          <div className="rating-proportion-bar">
            <span className="rating-proportion-fill" style={{ "width": getRatingProportion(1) }}></span>
          </div>
        </div>

      </div>

      <div className="characteristics">
        {
          props.metaObject.characteristics.Size ? <div className="characteristic">Size
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Size.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too small</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "113px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "230px" }}>Too large</span>
          </div> : <div></div>
        }
        {
          props.metaObject.characteristics.Width ? <div className="characteristic">Width
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Width.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too skinny</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "106px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "225px" }}>Too wide</span>
          </div> : <div></div>
        }
        {
          props.metaObject.characteristics.Comfort ? <div className="characteristic">Comfort
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Comfort.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Uncomfortable</span>
            <span className="characteristic-bar-label-right" style={{ "left": "250px" }}>Perfect</span>
          </div> : <div></div>
        }
        {
          props.metaObject.characteristics.Quality ? <div className="characteristic">Quality
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Quality.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Poor</span>
            <span className="characteristic-bar-label-right" style={{ "left": "315px" }}>Great</span>
          </div> : <div></div>
        }
        {
          props.metaObject.characteristics.Length ? <div className="characteristic">Length
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Length.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Too short</span>
            <span className="characteristic-bar-label-middle" style={{ "left": "110px" }}>Perfect</span>
            <span className="characteristic-bar-label-right" style={{ "left": "230px" }}>Too long</span>
          </div> : <div></div>
        }
        {
          props.metaObject.characteristics.Fit ? <div className="characteristic">Fit
            <div className="characteristic-bar">
              <span className="characteristic-icon" style={{ "left": (props.metaObject.characteristics.Fit.value / 5) * 95 + '%' }}>◈</span>
            </div>
            <span className="characteristic-bar-label-left">Poor</span>
            <span className="characteristic-bar-label-right" style={{ "left": "315px" }}>Great</span>
          </div> : <div></div>
        }
      </div>
    </div>
  )
}

export default Ratings