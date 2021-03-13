import React from 'react';
import PropTypes from 'prop-types';
import IndividualAnswer from './IndividualAnswer.jsx';
import captureQandA from '../../hoc/captureQandA';

const AnswerList = ({ answers, showMoreAnswersButton, handleShowMoreAnswers, loadOrCollapseAnswers, logger }) => {
  return (
    <div className="answer-list">
      {answers.map(answer => <IndividualAnswer key={answer.id} answer={answer} />)}
      {
          showMoreAnswersButton ?
          <div className="load-more-answers">
            <a
              href="#"
              className="link-clear"
              onClick={e => {
                handleShowMoreAnswers(e);
                logger(e);
              }}>{loadOrCollapseAnswers}
            </a>
          </div>
          : null
        }
    </div>
  );
};

export default captureQandA(AnswerList);

AnswerList.propTypes = {
  answers: PropTypes.array,
  showMoreAnswersButton: PropTypes.bool,
  handleShowMoreAnswers: PropTypes.func,
  loadOrCollapseAnswers: PropTypes.string,
  logger: PropTypes.func
};