import React, { useState } from 'react'
import axios from 'axios';

function NewReview(props) {
  const [hasClickedSubmit, clickedSubmit] = useState(false)
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

  const sendReview = () => {
    axios.post('/RatingsAndReviews/postReview', {
      product_id: props.productID,
      rating, summary, body, recommend, name, email, photos, characteristics
    })
  }

  const hideForm = () => {
    var modal = document.getElementById('newReviewForm')
    modal.style.display = "none";
  }

  const handleSubmit = () => {
    if (rating !== 0 && name !== '' && validateEmail(email) && body.length >= 50 && recommend !== null) {
      sendReview();
      hideForm();
      alert('Review submitted');
      clickedSubmit(false);
      setRating(0);
      setName('');
      setEmail('');
      setSummary('');
      setBody('');
      setRecommend(null);
      setCharCount(0);
      setPhotos([]);
      setCharacteristics({});
    } else {
      clickedSubmit(true);
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const showErrors = (input) => {

    if (input === 'rating' && rating === 0) {
      return 'You must enter a star rating'
    }
    if (input === 'name' && name === '') {
      return 'You must enter a name'
    }
    if (input === 'email' && !validateEmail(email)) {
      return 'You must enter a valid email'
    }
    if (input === 'body' && body.length < 50) {
      return 'You must enter a review longer than 50 characters'
    }
    if (input === 'recommend' && recommend === null) {
      return 'You must select a recommendation'
    }
  }

  const starColor = (num) => {
    if (num <= rating) {
      return { "color": "gold" };
    } else {
      return { "color": "gray" };
    }
  }

  const starRatingDesc = () => {
    if (rating === 1) {
      return 'Poor';
    } else if (rating === 2) {
      return 'Fair';
    } else if (rating === 3) {
      return 'Average';
    } else if (rating === 4) {
      return 'Good';
    } else if (rating === 5) {
      return 'Great';
    } else if (rating === 0) {
      return '';
    }
  }

  const handleChange = (e, func) => {
    e.preventDefault();
    func(e.target.value)
  }

  return (
    <div className="new-review">
      <div id="newReviewForm" className="new-review-modal">
        <div className="new-review-modal-content"> New Review
          <span onClick={hideForm} className="new-review-modal-close">&times;</span>
          <div className="review-form">
            Rate this product<sup className="mandatory">&nbsp;*</sup><div className="star-rating-form">
              <span onClick={() => { setRating(1) }} style={starColor(1)}>★</span>
              <span onClick={() => { setRating(2) }} style={starColor(2)}>★</span>
              <span onClick={() => { setRating(3) }} style={starColor(3)}>★</span>
              <span onClick={() => { setRating(4) }} style={starColor(4)}>★</span>
              <span onClick={() => { setRating(5) }} style={starColor(5)}>★</span>
              <span className="star-rating-desc">{' ' + starRatingDesc()}</span>
            </div> <br></br>
            <div className="name-and-email-form">
              <form>
                Name:<sup className="mandatory">&nbsp;*</sup><input className="new-review-name" onChange={(e) => { handleChange(e, setName) }} type="text" value={name}></input>
                Email:<sup className="mandatory">&nbsp;*</sup> <input className="new-review-email" onChange={(e) => { handleChange(e, setEmail) }} type="text" value={email}></input> <br></br> <br></br>
                Review summary:<br></br><textarea className="new-review-summary" onChange={(e) => { handleChange(e, setSummary) }} type="text" value={summary} rows="1" cols="30" ></textarea> <br></br>
                Enter your review:<sup className="mandatory">&nbsp;*</sup> <textarea className="new-review-body" onChange={(e) => { handleChange(e, setBody) }} type="text" placeholder="Spill the beans" value={body} rows="4" cols="50"></textarea><br></br>
                {
                  body.length < 50 ? <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum required characters: {50 - body.length}</span> : <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum reached</span>
                }
              </form>
              Would you recommend this product?<sup className="mandatory">&nbsp;*</sup>
              <form className="new-review-recommend">
                <input onClick={() => setRecommend(true)} type="radio" name="recommend" ></input>
                <label >Yes</label><br></br>
                <input onClick={() => setRecommend(false)} type="radio" name="recommend" ></input>
                <label >No</label><br></br>
              </form>
              {
                hasClickedSubmit ? <div className="new-review-errors">{showErrors('rating')}</div> : <div></div>
              }
              {
                hasClickedSubmit ? <div className="new-review-errors">{showErrors('name')}</div> : <div></div>
              }
              {
                hasClickedSubmit ? <div className="new-review-errors">{showErrors('email')}</div> : <div></div>
              }
              {
                hasClickedSubmit ? <div className="new-review-errors">{showErrors('body')}</div> : <div></div>
              }
              {
                hasClickedSubmit ? <div className="new-review-errors">{showErrors('recommend')}</div> : <div></div>
              }
              <button onClick={handleSubmit} className="new-review-submit-button">Submit</button>
            </div>
          </div >
        </div>
      </div>
    </div>
  )
}

export default NewReview;