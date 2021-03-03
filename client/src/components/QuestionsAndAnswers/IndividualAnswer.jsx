import React from 'react';
import PropTypes from 'prop-types';

const IndividualAnswer = ({ answer }) => {
  return (
    <div>
      <p>A: {answer.body}</p>
      <p>by {answer.answerer_name}, {answer.date}<span>|</span>Helpful? <a href="#">Yes {answer.helpfulness}</a><span>|</span><a href="#">Report</a></p>
    </div>
  );
};

export default IndividualAnswer;

IndividualAnswer.propTypes = {
  answer: PropTypes.object
}