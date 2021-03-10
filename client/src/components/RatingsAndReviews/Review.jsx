import React, { useState } from 'react';
import axios from 'axios';
import captureRandR from '../../hoc/captureRandR.js';
import URL from '../../URL';

function Review(props) {
  const [helpful, setHelpful] = useState(false);
  const [reported, report] = useState(false);
  const [selectedPhoto, selectPhoto] = useState({});

  const helpfulNum = function () {
    return helpful ? props.review.helpfulness + 1 : props.review.helpfulness;
  }

  const isReported = function () {
    return reported ? 'Reported' : 'Report'
  }

  const giveDate = function () {
    var formatDate = props.review.date.split("T")[0]
    var year = formatDate.slice(0, 4);
    var month = formatDate.slice(5, 7);
    var day = formatDate.slice(8, 10);
    var monthNames = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    return (`${monthNames[month]} ${day}, ${year}`)
  }

  const giveRatingPercentage = function () {
    var percent = props.review.rating / 5;
    percent *= 100;
    return JSON.stringify(percent) + "%"
  }

  const sendReport = function () {
    if (!reported) {
      //axios.put
      axios.put(`${URL}/RatingsAndReviews/report`, null, { params: { reviewId: props.review.review_id } })
    } else {
      alert('You have already reported this review')
    }
    report(true)
  }

  const sendHelpful = function () {
    if (!helpful) {
      //axios.put
      axios.put(`${URL}/RatingsAndReviews/helpful`, null, { params: { reviewId: props.review.review_id } })
    } else {
      alert('You have already marked this review as helpful')
    }
    setHelpful(true);
  }

  const handleImageClick = function (event) {
    var modal = document.getElementById("imageModal" + JSON.stringify(props.review.review_id));
    var index = event.target.id.split("-")[0];
    selectPhoto(props.review.photos[index])
    modal.style.display = "block";
  }

  const handleImageClose = function () {
    var modal = document.getElementById("imageModal" + JSON.stringify(props.review.review_id));
    modal.style.display = "none";
  }

  return (
    <div className="review">
      <div className="rating-sprite">
        <span style={{ "width": giveRatingPercentage() }} className="rating-sprite-fill"></span>
      </div>
      <div className="reviewer-name-and-date">{props.review.reviewer_name}, {giveDate()}</div>
      <div className="review-summary">{props.review.summary}</div>
      <div className="review-body">{props.review.body}</div>
      <div className="review-thumbnails"></div>
      {
        props.review.photos.map((image, i) => {
          return <img style={{ "cursor": "pointer" }} onClick={(e) => { handleImageClick(e); props.logger(e); }} className="review-thumbnail" key={image.id} id={`${i}-${image.id}`} src={image.url}></img>
        })
      }
      {
        props.review.response ? <div className="response"><b>Response from seller:</b><br></br>{props.review.response}</div> : <div></div>
      }
      {
        props.review.recommend ? <div className="recommend"> ✔ I recommend this product</div> : <div></div>
      }
      <span className="helpful">Helpful?</span>
      <span className="helpful-toggle" onClick={sendHelpful} >Yes</span>
      <span className="helpful-count">({helpfulNum()}) </span>
      <span className="report" onClick={() => { sendReport() }} >{isReported()}</span>
      <div id={"imageModal" + JSON.stringify(props.review.review_id)} className="review-image-modal">
        <div className="review-image-modal-content">
          <span onClick={handleImageClose} className="review-image-modal-close">&times;</span>
          <img className="review-image-modal-img" src={selectedPhoto.url} ></img>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default captureRandR(Review);