import React, { useState } from 'react'

function NewReview() {
  const [rating, updateRating] = useState(0);
  const [name, updateName] = useState('');
  const [email, updateEmail] = useState('');
  const [summary, updateSummary] = useState('');
  const [body, updateBody] = useState('');
  const [recommend, updateRecommend] = useState(false);
  const [charCount, updateCharCount] = useState(0);
  return (
    <div className="new-review">

    </div>
  )
}