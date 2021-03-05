import React, { useState } from 'react'
import axios from 'axios';

function NewReview(props) {
  const [rating, setRating] = useState(2);
  const [name, setName] = useState('tiny jeff');
  const [email, setEmail] = useState('evan@evan.com');
  const [summary, setSummary] = useState('a bit big');
  const [body, setBody] = useState('in my personal opinion I think these shoes have a great deal of extra volume that results in discomfort, they are well made however');
  const [recommend, setRecommend] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

  const sendReview = () => {
    axios.post('/RatingsAndReviews/postReview', {
      product_id: props.productID,
      rating, summary, body, recommend, name, email, photos, characteristics
    })
  }
  const showForm = () => {
    var modal = document.getElementById('newReviewForm');
    modal.style.display = "block";
  }

  const hideForm = () => {
    var modal = document.getElementById('newReviewForm')
    modal.style.display = "none";
  }

  const handleSubmit = () => {

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
      <button onClick={showForm}>Leave a review</button>
      <div id="newReviewForm" className="new-review-modal">
        <div className="new-review-modal-content"> New Review
          <span onClick={hideForm} className="new-review-modal-close">&times;</span>
          <div className="review-form">
            <div className="star-rating-form">
              <span onClick={() => { setRating(1) }} style={starColor(1)}>★</span>
              <span onClick={() => { setRating(2) }} style={starColor(2)}>★</span>
              <span onClick={() => { setRating(3) }} style={starColor(3)}>★</span>
              <span onClick={() => { setRating(4) }} style={starColor(4)}>★</span>
              <span onClick={() => { setRating(5) }} style={starColor(5)}>★</span>
              <span className="star-rating-desc">{' ' + starRatingDesc()}</span>
            </div>
            <div className="name-and-email-form">
              <form>
                Name: <input className="new-review-name" onChange={(e) => { handleChange(e, setName) }} type="text" value={name}></input>
                Email: <input className="new-review-email" onChange={(e) => { handleChange(e, setEmail) }} type="text" value={email}></input> <br></br>
                Review summary: <textarea className="new-review-summary" onChange={(e) => { handleChange(e, setSummary) }} type="text" value={summary} rows="1" cols="30" ></textarea> <br></br>
                Enter your review: <textarea className="new-review-body" onChange={(e) => { handleChange(e, setBody) }} type="text" placeholder="Spill the beans" value={body} rows="4" cols="50"></textarea>
                {
                  body.length < 50 ? <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum required characters: {50 - body.length}</span> : <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum reached</span>
                }
              </form>
              Would you recommend this product?
              <form className="new-review-recommend">
                <input onClick={() => setRecommend(true)} type="radio" name="recommend" ></input>
                <label >Yes</label><br></br>
                <input onClick={() => setRecommend(false)} type="radio" name="recommend" ></input>
                <label >No</label><br></br>
              </form>
            </div>
          </div >
        </div>
      </div>
    </div>
  )
}

export default NewReview;