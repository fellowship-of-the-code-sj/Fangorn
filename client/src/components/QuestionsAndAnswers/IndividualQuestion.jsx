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
        <p>Q: {question.question_body}</p>
        <p>Helpful? <a href="#">Yes {question.question_helpfulness}</a></p>
        <a href="#" onClick={handleAddAnswerModal}>Add Answer</a>
        <AnswerList answers={displayedAnswers} />
        {
          showMoreAnswersButton ?
          <a href="#" onClick={handleShowMoreAnswers}>LOAD MORE ANSWERS</a>
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