import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';

const IndividualQuestion = ({ question }) => {
  const [ answers, setAnswers ] = useState([]);
  const [ showAddAnswerModal, setShowAddAnswerModal ] = useState(false);
  const [ showMoreAnswersButton, setShowMoreAnswersButton ] = useState(false);
  const [ numDisplayedAnswers, setNumDisplayedAnswers ] = useState(0);
  const [ displayedAnswers, setDisplayedAnswers ] = useState([]);

  useEffect(() => {
    const allAnswers = _.values(question.answers);
    setAnswers(allAnswers);

    const numAnswers = allAnswers.length;
    let numToDisplay;
    if (numAnswers > 2) {
      setShowMoreAnswersButton(true);
      numToDisplay = 2;
    } else {
      numToDisplay = numAnswers;
    }
    setNumDisplayedAnswers(numToDisplay);
    setDisplayedAnswers(allAnswers.slice(0, numToDisplay));
  }, []);

  const handleShowMoreAnswers = e => {
    e.preventDefault();
    // there will not be any more answers to display
    if ((answers.length - numDisplayedAnswers) < 3) {
      setShowMoreAnswersButton(false);
      setNumDisplayedAnswers(answers.length);
      setDisplayedAnswers(answers.slice(0, answers.length));
    } else {
    // there will be more answers to display
      const updatedNum = numDisplayedAnswers + 2;
      setNumDisplayedAnswers(updatedNum);
      setDisplayedAnswers(answers.slice(0, updatedNum));
    }
  };

  const handleAddAnswerModal = e => {
    e.preventDefault();
    setShowAddAnswerModal(!showAddAnswerModal);
  };

  return (
    <div>
        <div className="flex">
          <div>Q:&nbsp;</div>
          <div>{question.question_body}</div>
          <div className="flex-grow"></div>
          <div>
            Helpful? <a href="#" className="link-clear">
              <span className="underline">Yes</span> ({question.question_helpfulness})
              </a>
          </div>
          <div className="spacer">|</div>
          <div>
            <a href="#" onClick={handleAddAnswerModal}>Add Answer</a>
          </div>
        </div>
        <AnswerList answers={displayedAnswers} />
        {
          showMoreAnswersButton ?
          <React.Fragment>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={handleShowMoreAnswers}>LOAD MORE ANSWERS</a>
          </React.Fragment>
          : null
        }
        {
          showAddAnswerModal ?
          <AddAnswer
          question={question.question_body}
            handleAddAnswerModal={handleAddAnswerModal}/>
          : null
        }
    </div>
  );
};

export default IndividualQuestion;

IndividualQuestion.propTypes = {
  question: PropTypes.object
};