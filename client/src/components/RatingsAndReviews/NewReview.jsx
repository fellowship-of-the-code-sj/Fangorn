import React, { useState } from 'react'

function NewReview() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [charCount, setCharCount] = useState(0);
  return (
    <div className="new-review">

    </div>
  )
}