import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';
import AddQuestion from './AddQuestion.jsx';
import serverRequest from '../../../helperFunctions/serverRequest.js';

const QuestionsAndAnswers = ({ productID }) => {
  const [ questions, setQuestions ] = useState([]);
  const [ showAddQuestionModal, setShowAddQuestionModal ] = useState(false);
  const [ showMoreQuestionsButton, setShowMoreQuestionsButton ] = useState(false);
  const [ numDisplayedQuestions, setNumDisplayedQuestions ] = useState(0);
  const [ displayedQuestions, setDisplayedQuestions ] = useState([]);

  useEffect(() => {
    serverRequest.get(
      `http://localhost:404/Questions/${productID}`,
      null,
      response => {
        setQuestions(response.data);

        const totalNumberOfQuestions = response.data.length;
        let num;
        if (totalNumberOfQuestions > 2) {
          setShowMoreQuestionsButton(true);
          num = 2;
        } else {
          num = totalNumberOfQuestions;
        }
        setNumDisplayedQuestions(num);
        setDisplayedQuestions(response.data.slice(0, num));
      });
  }, []);

  const handleShowMoreQuestions = e => {
    // there will not be any more questions to display
    if ((questions.length - numDisplayedQuestions) < 3) {
      setShowMoreQuestionsButton(false);
      setNumDisplayedQuestions(questions.length);
      setDisplayedQuestions(questions.slice(0, questions.length));
    } else {
    // there will be more questions to display
      const updatedNum = numDisplayedQuestions + 2;
      setNumDisplayedQuestions(updatedNum);
      setDisplayedQuestions(questions.slice(0, updatedNum));
    }
  };

  const handleAddQuestionModal = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  return (
    <div>
      <h3>Questions &amp; Answers</h3>
      <Search />
      <QuestionsList
        questions={displayedQuestions} />
      <div>
        {
          showMoreQuestionsButton ?
          <MoreAnsweredQuestions handleShowMoreQuestions={handleShowMoreQuestions}/>
          : null
        }
        <AddQuestionButton handleAddQuestionModal={handleAddQuestionModal} />
      </div>
      {
        showAddQuestionModal ?
        <AddQuestion handleAddQuestionModal={handleAddQuestionModal}/>
        : null
      }
    </div>
  );
}

export default QuestionsAndAnswers;

QuestionsAndAnswers.propTypes = {
  productID: PropTypes.number
}