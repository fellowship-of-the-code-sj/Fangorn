/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios';
import captureRandR from '../../hoc/captureRandR.js';

//; props.logger(e)

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
  const [photoURL, setPhotoURL] = useState('');


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
    if (!size && props.metaObject.characteristics.Size) {
      return false;
    }
    if (!width && props.metaObject.characteristics.Width) {
      return false;
    }
    if (!comfort && props.metaObject.characteristics.Comfort) {
      return false;
    }
    if (!quality && props.metaObject.characteristics.Quality) {
      return false;
    }
    if (!length && props.metaObject.characteristics.Length) {
      return false;
    }
    if (!fit && props.metaObject.characteristics.Fit) {
      return false;
    }
    return true;
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



  // Conditionals

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
      return 'You must rate each of the characteristics'
    }
    return (<div className="new-review-errors-spacer"></div>)
  }

  const starColor = (num) => {
    if (num <= rating) {
      return { "color": "gold" };
    } else {
      return { "color": "gray" };
    }
  }

  const starRatingDesc = () => {
    switch (rating) {
      case 0: return '';
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Great';
    }
  }

  const getCharacteristicMeaning = (characteristic) => {

    if (characteristic === 'size') {
      switch (size) {
        case null: return 'none selected';
        case 1: return 'A size too small';
        case 2: return '½ a size too small';
        case 3: return 'Perfect';
        case 4: return '½ a size too big';
        case 5: return 'A size too big';
      }
    }

    if (characteristic === 'width') {
      switch (width) {
        case null: return 'none selected';
        case 1: return 'Too narrow';
        case 2: return 'Slightly narrow';
        case 3: return 'Perfect';
        case 4: return 'Slightly wide';
        case 5: return 'Too wide';
      }
    }

    if (characteristic === 'comfort') {
      switch (comfort) {
        case null: return 'none selected';
        case 1: return 'Uncomfortable';
        case 2: return 'Slightly uncomfortable';
        case 3: return 'Ok';
        case 4: return 'Comfortable';
        case 5: return 'Perfect';
      }
    }

    if (characteristic === 'quality') {
      switch (quality) {
        case null: return 'none selected';
        case 1: return 'Poor';
        case 2: return 'Below average';
        case 3: return 'What I expected';
        case 4: return 'Pretty great';
        case 5: return 'Perfect';
      }
    }

    if (characteristic === 'length') {
      switch (length) {
        case null: return 'none selected';
        case 1: return 'Runs short';
        case 2: return 'Runs slightly short';
        case 3: return 'Perfect';
        case 4: return 'Runs slightly long';
        case 5: return 'Runs long';
      }
    }

    if (characteristic === 'fit') {
      switch (fit) {
        case null: return 'none selected';
        case 1: return 'Runs tight';
        case 2: return 'Runs slightly tight';
        case 3: return 'Perfect';
        case 4: return 'Runs slightly loose';
        case 5: return 'Runs loose';
      }
    }

  }

  // Event handlers

  const handleChange = (e, func) => {
    e.preventDefault();
    func(e.target.value)
  }

  const handleAddPhoto = () => {
    var modal = document.getElementById('newReviewPhotoModal');
    modal.style.display = "block";
  }

  const closeAddPhoto = () => {
    var modal = document.getElementById('newReviewPhotoModal');
    modal.style.display = "none";
  }

  const submitPhoto = (e) => {
    e.preventDefault();
    if (checkURL(photoURL)) {
      var newPhotos = photos;
      newPhotos.push(photoURL);
      setPhotos(newPhotos);
      setPhotoURL('');
      closeAddPhoto();
    } else {
      alert('Cannot accept image, invalid URL');
    }

  }

  // Input validators



  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  // Subcomponents

  const Mstar = () => (
    <sup className="mandatory">&nbsp;*</sup>
  )

  const Rating = () => (
    <div className="new-review-rating">
      <span className="new-review-form-title">Rate this product</span> <Mstar />
      <div className="new-review-star-rating-form">
        <span className="new-review-star" onClick={(e) => { setRating(1); props.logger(e) }} style={starColor(1)}>★</span>
        <span className="new-review-star" onClick={(e) => { setRating(2); props.logger(e) }} style={starColor(2)}>★</span>
        <span className="new-review-star" onClick={(e) => { setRating(3); props.logger(e) }} style={starColor(3)}>★</span>
        <span className="new-review-star" onClick={(e) => { setRating(4); props.logger(e) }} style={starColor(4)}>★</span>
        <span className="new-review-star" onClick={(e) => { setRating(5); props.logger(e) }} style={starColor(5)}>★</span>
        <span className="star-rating-desc">{' ' + starRatingDesc()}</span>
      </div>
      {hasClickedSubmit ? <div className="new-review-errors">{showErrors('rating')}</div> : <div className="new-review-errors-spacer"></div>}
    </div>
  )

  const Images = () => (
    <div className="new-review-thumbnails">
      {photos.map((image, i) => {
        return <img className="review-thumbnail" key={i} src={image}></img>
      })}
      {photos[0] ? null : <div className="review-thumbnail-spacer"></div>}
      {
        photos.length < 5 ? <div className="new-review-add-photo-button">
          <br></br><button onClick={(e) => { handleAddPhoto(e) }}>&nbsp;Add a photo&nbsp;</button>
        </div> : <div><div className="new-review-add-photo-button-spacer"></div></div>
      }
    </div>
  )

  return (
    <div className="new-review" >
      <div id="newReviewForm" className="new-review-modal">
        <div className="new-review-modal-content">
          <span className="new-review-modal-close" onClick={(e) => { hideForm(e); props.logger(e) }} >&times;</span>
          <div className="new-review-modal-title">Write a review about {props.productName}</div>
          <Rating />
          <form>
            <div className="new-review-name">
              <span className="new-review-form-title">Name:&nbsp;</span><input className="new-review-name" placeholder=" e.g. jackson11!" size="25" maxLength="60" onChange={(e) => { handleChange(e, setName) }} type="text" value={name}></input><Mstar /><br></br>
              {hasClickedSubmit ? <div className="new-review-errors">{showErrors('name')}</div> : <div className="new-review-errors-spacer"></div>}
            </div>
            <div className="new-review-email">
              <span className="new-review-form-title">Email:&nbsp;&nbsp;</span><input className="new-review-email" placeholder=" e.g. jackson11@email.com" size="25" maxLength="60" onChange={(e) => { handleChange(e, setEmail) }} type="text" value={email}></input><Mstar /><br></br>
              {hasClickedSubmit ? <div className="new-review-errors">{showErrors('email')}</div> : <div className="new-review-errors-spacer"></div>}
              <span className="disclaimer-small">For authentication reasons, you will not be emailed</span>
            </div>
            <div className="new-review-summary">
              <span className="new-review-form-title">Review summary:</span> <br></br><textarea placeholder=" e.g. Best purchase ever!" maxLength="60" onChange={(e) => { handleChange(e, setSummary) }} type="text" value={summary} rows="1" cols="30" ></textarea>
            </div>
            <div className="new-review-body">
              <span className="new-review-form-title">Enter your review: </span><Mstar />
              <br></br><textarea className="new-review-body" placeholder=" Why did you like the product or not?" maxLength="500" onChange={(e) => { handleChange(e, setBody) }} type="text" value={body} rows="4" cols="50"></textarea><br></br>
              <div className="new-review-char-tracker">
                {body.length < 50 ? <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum required characters: {50 - body.length}</span> : <span className="new-review-char-count" style={{ "fontSize": "small" }}>Minimum reached</span>}
              </div>
              {hasClickedSubmit ? <div className="new-review-errors">{showErrors('body')}</div> : <div className="new-review-errors-spacer"></div>}
            </div>
          </form>
          <div className="new-review-recommend">
            <span className="new-review-form-title">Would you recommend this product?</span> <Mstar />
            <form>
              <input onClick={(e) => { setRecommend(true); props.logger(e) }} type="radio" name="recommend" ></input>
              <label >&nbsp;Yes</label><br></br>
              <input onClick={(e) => { setRecommend(false); props.logger(e) }} type="radio" name="recommend" ></input>
              <label >&nbsp;No</label><br></br>
            </form>
            {hasClickedSubmit ? <div className="new-review-errors">{showErrors('recommend')}</div> : <div className="new-review-errors-spacer"></div>}
          </div>
          <div className="new-review-characteristics">
            <form><span className="new-review-form-title">Product characteristics:</span> <Mstar />
              {
                props.metaObject.characteristics.Size ? <div className="new-review-size">
                  Size: <div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setSize(1); props.logger(e) }} type="radio" name="size"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setSize(2); props.logger(e) }} type="radio" name="size"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setSize(3); props.logger(e) }} type="radio" name="size"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setSize(4); props.logger(e) }} type="radio" name="size"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setSize(5); props.logger(e) }} type="radio" name="size"></input><label>5</label>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('size')}</div>
                  </div></div> : <div></div>
              }
              {
                props.metaObject.characteristics.Width ? <div className="new-review-width">
                  Width:<div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setWidth(1); props.logger(e) }} type="radio" name="width"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setWidth(2); props.logger(e) }} type="radio" name="width"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setWidth(3); props.logger(e) }} type="radio" name="width"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setWidth(4); props.logger(e) }} type="radio" name="width"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setWidth(5); props.logger(e) }} type="radio" name="width"></input><label>5</label>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('width')}</div>
                  </div> </div> : <div></div>
              }
              {
                props.metaObject.characteristics.Comfort ? <div className="new-review-comfort">
                  Comfort:<div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setComfort(1); props.logger(e) }} type="radio" name="comfort"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setComfort(2); props.logger(e) }} type="radio" name="comfort"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setComfort(3); props.logger(e) }} type="radio" name="comfort"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setComfort(4); props.logger(e) }} type="radio" name="comfort"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setComfort(5); props.logger(e) }} type="radio" name="comfort"></input><label>5</label>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('comfort')}</div>
                  </div> </div> : <div></div>
              }
              {
                props.metaObject.characteristics.Quality ? <div className="new-review-quality">
                  Quality:<div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setQuality(1); props.logger(e) }} type="radio" name="quality"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setQuality(2); props.logger(e) }} type="radio" name="quality"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setQuality(3); props.logger(e) }} type="radio" name="quality"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setQuality(4); props.logger(e) }} type="radio" name="quality"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setQuality(5); props.logger(e) }} type="radio" name="quality"></input><label>5</label>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('quality')}</div>
                  </div> </div> : <div></div>
              }
              {
                props.metaObject.characteristics.Length ? <div className="new-review-length">
                  Length:<div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setLength(1); props.logger(e) }} type="radio" name="length"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setLength(2); props.logger(e) }} type="radio" name="length"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setLength(3); props.logger(e) }} type="radio" name="length"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setLength(4); props.logger(e) }} type="radio" name="length"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setLength(5); props.logger(e) }} type="radio" name="length"></input><label>5</label>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('length')}</div>
                  </div> </div>
                  : <div></div>
              }
              {
                props.metaObject.characteristics.Fit ? <div className="new-review-fit">
                  Fit:<div className="new-review-radio-array">
                    <input className="new-review-radios" onClick={(e) => { setFit(1); props.logger(e) }} type="radio" name="fit"></input><label>1</label>
                    <input className="new-review-radios" onClick={(e) => { setFit(2); props.logger(e) }} type="radio" name="fit"></input><label>2</label>
                    <input className="new-review-radios" onClick={(e) => { setFit(3); props.logger(e) }} type="radio" name="fit"></input><label>3</label>
                    <input className="new-review-radios" onClick={(e) => { setFit(4); props.logger(e) }} type="radio" name="fit"></input><label>4</label>
                    <input className="new-review-radios" onClick={(e) => { setFit(5); props.logger(e) }} type="radio" name="fit"></input><label>5</label><br></br>
                    <div className="new-review-characteristic-meaning">{getCharacteristicMeaning('fit')}</div>
                  </div> </div>
                  : <div></div>
              }
            </form>
            {hasClickedSubmit ? <div className="new-review-errors">{showErrors('characteristics')}</div> : <div className="new-review-errors-spacer"></div>}
          </div>
          <Images />
          <div className="new-review-photo-modal" id="newReviewPhotoModal">
            <div className="new-review-photo-modal-content">
              <span onClick={(e) => { closeAddPhoto(e) }} className="new-review-photo-modal-close">&times;</span>
              <form className="new-review-photo-modal-form">Enter the URL of the image you would like to display<br></br><br></br>
                <input type="text" onChange={(e) => { handleChange(e, setPhotoURL); props.logger(e) }} value={photoURL}></input><br></br><br></br>
                {
                  photoURL ? <img className="review-thumbnail" src={photoURL}></img> : <div></div>
                }
                <br></br><br></br><button onClick={(e) => { submitPhoto(e); props.logger(e) }}>Submit photo</button>
              </form>
            </div>
          </div>
          <button onClick={handleSubmit} className="new-review-submit-button">&nbsp;Submit&nbsp;</button>
        </div>
      </div>
    </div>
  )
}

export default captureRandR(NewReview);