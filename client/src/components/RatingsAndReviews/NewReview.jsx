import React, { useState } from 'react'
import axios from 'axios';

function NewReview(props) {
  const [rating, setRating] = useState(4);
  const [name, setName] = useState('evan');
  const [email, setEmail] = useState('evan@evan.com');
  const [summary, setSummary] = useState('not bad');
  const [body, setBody] = useState('not great');
  const [recommend, setRecommend] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

  const sendReview = () => {
    axios.post('/RatingsAndReviews/postReview', {
      product_id: 13027, //props.productID or something
      rating, summary, body, recommend, name, email, photos, characteristics
    })
  }
  return (
    <div className="new-review">
      <button onClick={sendReview}>Leave a review</button>
    </div>
  )
}

export default NewReview;