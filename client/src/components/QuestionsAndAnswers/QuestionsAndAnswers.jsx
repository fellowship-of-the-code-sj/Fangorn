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

  useEffect(() => {
    serverRequest.get(
      `http://localhost:404/Questions/${productID}`,
      null,
      response => setQuestions(response.data));
  }, []);

  const handleAddQuestionModal = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  return (
    <div>
      <h3>Questions &amp; Answers</h3>
      <Search />
      <QuestionsList questions={questions} />
      <div>
        <MoreAnsweredQuestions />
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