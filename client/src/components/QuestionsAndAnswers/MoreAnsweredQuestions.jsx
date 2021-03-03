import React from 'react';
import PropTypes from 'prop-types';

const MoreAnsweredQuestions = ({ handleShowMoreQuestions }) => <button onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</button>;

export default MoreAnsweredQuestions;

MoreAnsweredQuestions.propTypes = {
  handleShowMoreQuestions: PropTypes.func
};