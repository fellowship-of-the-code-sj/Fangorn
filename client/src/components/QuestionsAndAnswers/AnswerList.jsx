import React from 'react';
import PropTypes from 'prop-types';
import IndividualAnswer from './IndividualAnswer.jsx';

const AnswerList = ({ answers }) => {
  return (
    <div>
      {answers.map(answer => <IndividualAnswer key={answer.id} answer={answer} />)}
    </div>
  );
};

export default AnswerList;

AnswerList.propTypes = {
  answers: PropTypes.array
};