import React from 'react';
import PropTypes from 'prop-types';
import IndividualAnswer from './IndividualAnswer.jsx';

const AnswerList = ({ answers, showMoreAnswersButton, handleShowMoreAnswers, loadOrCollapseAnswers }) => {
  return (
    <div>
      {answers.map(answer => <IndividualAnswer key={answer.id} answer={answer} />)}
      {
          showMoreAnswersButton ?
          <div className="load-more-answers">
            <a
              href="#"
              className="link-clear"
              onClick={handleShowMoreAnswers}>{loadOrCollapseAnswers}
            </a>
          </div>
          : null
        }
    </div>
  );
};

export default AnswerList;

AnswerList.propTypes = {
  answers: PropTypes.array,
  showMoreAnswersButton: PropTypes.bool,
  handleShowMoreAnswers: PropTypes.func,
  loadOrCollapseAnswers: PropTypes.string
};