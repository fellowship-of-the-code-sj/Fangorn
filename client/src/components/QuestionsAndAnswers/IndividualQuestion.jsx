import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';

const IndividualQuestion = ({ question }) => {
  let answers = [];
  for (var key in question.answers) {
    answers.push(question.answers[key]);
  }

  return (
    <div>
        <p>Q: {question.question_body}</p>
        <p>Helpful? <a href="#">Yes {question.question_helpfulness}</a></p>
        <a href="#">Add Answer</a>
        <AnswerList answers={answers} />
    </div>
  );
};

export default IndividualQuestion;

IndividualQuestion.propTypes = {
  question: PropTypes.object
};