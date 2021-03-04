import React from 'react';
import PropTypes from 'prop-types';
import IndividualQuestion from './IndividualQuestion.jsx';

const QuestionsList = ({ questions }) => {
  return (
    <div className="scrollable-content">
      {questions.map(question => <IndividualQuestion key={question.question_id} question={question} />)}
    </div>
  );
};

export default QuestionsList;

QuestionsList.propTypes = {
  questions: PropTypes.array
};