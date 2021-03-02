import React, { useState } from 'react';

function Review(props) {
  const [helpful, setHelpful] = useState(false);
  const [reported, report] = useState(false);

  const helpfulNum = function () {
    return helpful ? props.review.helpfulness + 1 : props.review.helpfulness;
  }

  const isReported = function () {
    return reported ? 'Reported' : 'Report'
  }

  const sendReport = function () {
    if (!reported) {
      //axios.post
    }
    report(true)
  }

  const sendHelpful = function () {
    if (!helpful) {
      //axios.post
    }

    setHelpful(true);
  }

  return (
    <div className="review">
      <h3>Review tile:</h3>
      <span className="rating"></span>
      <span className="reviewer-name">{props.review.reviewer_name}</span>
      <span className="date">{ }</span>
      <div className="review-summary">{props.review.summary}</div>
      <div className="recommend">{ }</div>
      <div className="review-body">{props.review.body}</div>
      <div className="response">{ }</div>
      <span className="helpful">Helpful?</span>
      <span className="helpful-toggle" onClick={sendHelpful} >Yes</span>
      <span className="helpful-count">{helpfulNum()}</span>
      <span className="report" onClick={() => { sendReport(); alert('Review has been reported') }} >{isReported()}</span>
    </div>
  )
}

export default Review;