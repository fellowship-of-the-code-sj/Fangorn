import React from 'react';
import PropTypes from 'prop-types';
import IndividualQuestion from './IndividualQuestion.jsx';

const QuestionsList = ({ questions, productName }) => {
  return (
    <div className="scrollable-content question-list">
      {
        questions.map(question => {
          return (
            <IndividualQuestion
              key={question.question_id}
              productName={productName}
              question={question} />
          );
        })
      }
    </div>
  );
};

export default QuestionsList;

QuestionsList.propTypes = {
  questions: PropTypes.array,
  productName: PropTypes.string
};