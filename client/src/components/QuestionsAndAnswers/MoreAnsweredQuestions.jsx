import React from 'react';
import PropTypes from 'prop-types';
import captureQandA from '../../hoc/captureQandA';

const MoreAnsweredQuestions = ({ handleShowMoreQuestions, logger }) => {
  return (
    <button
      className="question-buttons more-answers-button"
      onClick={e => {
        handleShowMoreQuestions(e);
        logger(e);
      }}>MORE ANSWERED QUESTIONS</button>
  );
}

export default captureQandA(MoreAnsweredQuestions);

MoreAnsweredQuestions.propTypes = {
  handleShowMoreQuestions: PropTypes.func,
  logger: PropTypes.func
};