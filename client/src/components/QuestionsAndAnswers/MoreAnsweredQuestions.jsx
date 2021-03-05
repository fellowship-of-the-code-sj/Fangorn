import React from 'react';
import PropTypes from 'prop-types';

const MoreAnsweredQuestions = ({ handleShowMoreQuestions }) => {
  return (
    <button
      className="question-buttons more-answers-button"
      onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</button>
  );
}

export default MoreAnsweredQuestions;

MoreAnsweredQuestions.propTypes = {
  handleShowMoreQuestions: PropTypes.func
};