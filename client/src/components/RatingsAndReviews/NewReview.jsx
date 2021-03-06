/* eslint-disable react/prop-types */
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
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [quality, setQuality] = useState(null);
  const [length, setLength] = useState(null);
  const [fit, setFit] = useState(null);


  const sendReview = () => {
    var characteristics = {};
    if (props.metaObject.characteristics.Size) {
      characteristics[props.metaObject.characteristics.Size.id] = size;
    }
    if (props.metaObject.characteristics.Width) {
      characteristics[props.metaObject.characteristics.Width.id] = width;
    }
    if (props.metaObject.characteristics.Comfort) {
      characteristics[props.metaObject.characteristics.Comfort.id] = comfort;
    }
    if (props.metaObject.characteristics.Quality) {
      characteristics[props.metaObject.characteristics.Quality.id] = quality;
    }
    if (props.metaObject.characteristics.Length) {
      characteristics[props.metaObject.characteristics.Length.id] = length;
    }
    if (props.metaObject.characteristics.Fit) {
      characteristics[props.metaObject.characteristics.Fit.id] = fit;
    }

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
    if (isValidForm()) {
      sendReview();
      hideForm();
      alert('Review submitted');
      clickedSubmit(false);
      clearForm();
    } else {
      clickedSubmit(true);
    }
  }

  const isValidForm = () => {
    if (rating !== 0 && name !== '' && validateEmail(email) && body.length >= 50 && recommend !== null && isValidCharacteristics()) {
      return true;
    } else {
      return false;
    }
  }

  const isValidCharacteristics = () => {
    var valid = 1;
    if (size || !props.metaObject.characteristics.Size) {
      valid *= 1
    } else {
      valid *= 0
    }
    if (width || !props.metaObject.characteristics.Width) {
      valid *= 1
    } else {
      valid *= 0
    }
    if (comfort || !props.metaObject.characteristics.Comfort) {
      valid *= 1
    } else {
      valid *= 0
    }
    if (quality || !props.metaObject.characteristics.Quality) {
      valid *= 1
    } else {
      valid *= 0
    }
    if (length || !props.metaObject.characteristics.Length) {
      valid *= 1
    } else {
      valid *= 0
    }
    if (fit || !props.metaObject.characteristics.Fit) {
      valid *= 1
    } else {
      valid *= 0
    }

    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  const clearForm = () => {
    setRating(0);
    setName('');
    setEmail('');
    setSummary('');
    setBody('');
    setRecommend(null);
    setCharCount(0);
    setPhotos([]);
    setSize(null);
    setWidth(null);
    setComfort(null);
    setQuality(null);
    setLength(null);
    setFit(null);
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
    if (input === 'characteristics' && !isValidCharacteristics()) {
      return 'You must fill out all the characteristics'
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

  const getCharacteristicMeaning = (characteristic) => {
    if (characteristic === 'size') {
      if (size === null) {
        return 'none selected';
      } else if (size === 1) {
        return 'A size too small';
      } else if (size === 2) {
        return '½ a size too small';
      } else if (size === 3) {
        return 'Perfect';
      } else if (size === 4) {
        return '½ a size too big';
      } else if (size === 5) {
        return 'A size too big';
      }
    }
    if (characteristic === 'width') {
      if (width === null) {
        return 'none selected';
      } else if (width === 1) {
        return 'Too narrow';
      } else if (width === 2) {
        return 'Slightly narrow';
      } else if (width === 3) {
        return 'Perfect';
      } else if (width === 4) {
        return 'Slightly wide';
      } else if (width === 5) {
        return 'Too wide';
      }
    }
    if (characteristic === 'comfort') {
      if (comfort === null) {
        return 'none selected';
      } else if (comfort === 1) {
        return 'Uncomfortable';
      } else if (comfort === 2) {
        return 'Slightly uncomfortable';
      } else if (comfort === 3) {
        return 'Ok';
      } else if (comfort === 4) {
        return 'Comfortable';
      } else if (comfort === 5) {
        return 'Perfect';
      }
    }
    if (characteristic === 'quality') {
      if (quality === null) {
        return 'none selected';
      } else if (quality === 1) {
        return 'Poor';
      } else if (quality === 2) {
        return 'Below average';
      } else if (quality === 3) {
        return 'What I expected';
      } else if (quality === 4) {
        return 'Pretty great';
      } else if (quality === 5) {
        return 'Perfect';
      }
    }
    if (characteristic === 'length') {
      if (length === null) {
        return 'none selected';
      } else if (length === 1) {
        return 'Runs short';
      } else if (length === 2) {
        return 'Runs slightly short';
      } else if (length === 3) {
        return 'Perfect';
      } else if (length === 4) {
        return 'Runs slightly long';
      } else if (length === 5) {
        return 'Runs long';
      }
    }
    if (characteristic === 'fit') {
      if (fit === null) {
        return 'none selected';
      } else if (fit === 1) {
        return 'Runs tight';
      } else if (fit === 2) {
        return 'Runs slightly tight';
      } else if (fit === 3) {
        return 'Perfect';
      } else if (fit === 4) {
        return 'Runs slightly loose';
      } else if (fit === 5) {
        return 'Runs loose';
      }
    }
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
                Name:<sup className="mandatory">&nbsp;*</sup><input className="new-review-name" placeholder="e.g. jackson11!" size="25" maxLength="60" onChange={(e) => { handleChange(e, setName) }} type="text" value={name}></input><br></br>
                Email:<sup className="mandatory">&nbsp;*</sup><input className="new-review-email" placeholder="e.g. jackson11@email.com" size="25" maxLength="60" onChange={(e) => { handleChange(e, setEmail) }} type="text" value={email}></input> <br></br>
                <span className="disclaimer-small">For authentication reasons, you will not be emailed</span><br></br><br></br>
                Review summary:<br></br><textarea className="new-review-summary" placeholder="e.g. Best purchase ever!" maxLength="60" onChange={(e) => { handleChange(e, setSummary) }} type="text" value={summary} rows="1" cols="30" ></textarea> <br></br>
                Enter your review:<sup className="mandatory">&nbsp;*</sup> <textarea className="new-review-body" placeholder="Why did you like the product or not?" maxLength="500" onChange={(e) => { handleChange(e, setBody) }} type="text" value={body} rows="4" cols="50"></textarea><br></br>
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
              <form className="new-review-characteristics">Product characteristics<sup className="mandatory">&nbsp;*</sup>
                {
                  props.metaObject.characteristics.Size ? <div className="new-review-size">
                    Size: <input onClick={() => { setSize(1) }} type="radio" name="size"></input><label>1</label>
                    <input onClick={() => { setSize(2) }} type="radio" name="size"></input><label>2</label>
                    <input onClick={() => { setSize(3) }} type="radio" name="size"></input><label>3</label>
                    <input onClick={() => { setSize(4) }} type="radio" name="size"></input><label>4</label>
                    <input onClick={() => { setSize(5) }} type="radio" name="size"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('size')}</span>
                  </div> : <div></div>
                }
                {
                  props.metaObject.characteristics.Width ? <div className="new-review-width">
                    Width: <input onClick={() => { setWidth(1) }} type="radio" name="width"></input><label>1</label>
                    <input onClick={() => { setWidth(2) }} type="radio" name="width"></input><label>2</label>
                    <input onClick={() => { setWidth(3) }} type="radio" name="width"></input><label>3</label>
                    <input onClick={() => { setWidth(4) }} type="radio" name="width"></input><label>4</label>
                    <input onClick={() => { setWidth(5) }} type="radio" name="width"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('width')}</span>
                  </div> : <div></div>
                }
                {
                  props.metaObject.characteristics.Comfort ? <div className="new-review-comfort">
                    Comfort: <input onClick={() => { setComfort(1) }} type="radio" name="comfort"></input><label>1</label>
                    <input onClick={() => { setComfort(2) }} type="radio" name="comfort"></input><label>2</label>
                    <input onClick={() => { setComfort(3) }} type="radio" name="comfort"></input><label>3</label>
                    <input onClick={() => { setComfort(4) }} type="radio" name="comfort"></input><label>4</label>
                    <input onClick={() => { setComfort(5) }} type="radio" name="comfort"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('comfort')}</span>
                  </div> : <div></div>
                }
                {
                  props.metaObject.characteristics.Quality ? <div className="new-review-quality">
                    Quality: <input onClick={() => { setQuality(1) }} type="radio" name="quality"></input><label>1</label>
                    <input onClick={() => { setQuality(2) }} type="radio" name="quality"></input><label>2</label>
                    <input onClick={() => { setQuality(3) }} type="radio" name="quality"></input><label>3</label>
                    <input onClick={() => { setQuality(4) }} type="radio" name="quality"></input><label>4</label>
                    <input onClick={() => { setQuality(5) }} type="radio" name="quality"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('quality')}</span>
                  </div> : <div></div>
                }
                {
                  props.metaObject.characteristics.Length ? <div className="new-review-length">
                    Length: <input onClick={() => { setLength(1) }} type="radio" name="length"></input><label>1</label>
                    <input onClick={() => { setLength(2) }} type="radio" name="length"></input><label>2</label>
                    <input onClick={() => { setLength(3) }} type="radio" name="length"></input><label>3</label>
                    <input onClick={() => { setLength(4) }} type="radio" name="length"></input><label>4</label>
                    <input onClick={() => { setLength(5) }} type="radio" name="length"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('length')}</span>
                  </div> : <div></div>
                }
                {
                  props.metaObject.characteristics.Fit ? <div className="new-review-fit">
                    Fit: <input onClick={() => { setFit(1) }} type="radio" name="fit"></input><label>1</label>
                    <input onClick={() => { setFit(2) }} type="radio" name="fit"></input><label>2</label>
                    <input onClick={() => { setFit(3) }} type="radio" name="fit"></input><label>3</label>
                    <input onClick={() => { setFit(4) }} type="radio" name="fit"></input><label>4</label>
                    <input onClick={() => { setFit(5) }} type="radio" name="fit"></input><label>5</label><br></br>
                    <span className="new-review-characteristic-meaning">{getCharacteristicMeaning('fit')}</span>
                  </div> : <div></div>
                }
              </form>
              {
                hasClickedSubmit ? <div>
                  <div className="new-review-errors">{showErrors('rating')}</div>
                  <div className="new-review-errors">{showErrors('name')}</div>
                  <div className="new-review-errors">{showErrors('email')}</div>
                  <div className="new-review-errors">{showErrors('body')}</div>
                  <div className="new-review-errors">{showErrors('recommend')}</div>
                  <div className="new-review-errors">{showErrors('characteristics')}</div>
                </div> : <div></div>
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