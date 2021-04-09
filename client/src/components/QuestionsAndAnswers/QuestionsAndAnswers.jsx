import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestionButton from './AddQuestionButton.jsx';
import AddQuestion from './AddQuestion.jsx';
import serverRequest from '../../../helperFunctions/serverRequest.js';
import URL from '../../URL';

const QuestionsAndAnswers = ({ productID, productName }) => {
  // Search
  const [ query, setQuery ] = useState('');
  // QuestionsList
  const [ originalQuestions, setOriginalQuestions ] = useState([]);
  const [ questions, setQuestions ] = useState([]);
  const [ showAddQuestionModal, setShowAddQuestionModal ] = useState(false);
  const [ showMoreQuestionsButton, setShowMoreQuestionsButton ] = useState(false);
  const [ numDisplayedQuestions, setNumDisplayedQuestions ] = useState(0);
  const [ displayedQuestions, setDisplayedQuestions ] = useState([]);
  // Add Question
  const [ question, setQuestion ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');

  useEffect(() => {
    axios.get(`/questions/${productID}`)
      .then(response => {
        const sortedList = _.sortBy(response.data, question => question.question_helpfulness).reverse();

        setOriginalQuestions(sortedList);
        setQuestions(sortedList);

        const totalNumberOfQuestions = sortedList.length;
        let numToDisplay;
        if (totalNumberOfQuestions > 2) {
          setShowMoreQuestionsButton(true);
          numToDisplay = 2;
        } else {
          numToDisplay = totalNumberOfQuestions;
        }
        setNumDisplayedQuestions(numToDisplay);
        setDisplayedQuestions(sortedList.slice(0, numToDisplay));
      });
  }, [productID]);

  useEffect(() => {
    if (query.length > 2) {
      const filteredQuestions = _.filter(originalQuestions, (question) => question.question_body.indexOf(query) !== -1);
      setQuestions(filteredQuestions);
      setDisplayedQuestions(filteredQuestions.slice(0, numDisplayedQuestions));
      if ((filteredQuestions.length - numDisplayedQuestions) < 3) setShowMoreQuestionsButton(false);
      setDisplayedQuestions(filteredQuestions.slice(0, numDisplayedQuestions));
    }

    if (query.length < 3) {
      setQuestions(originalQuestions);
      if ((originalQuestions.length - numDisplayedQuestions) > 0) setShowMoreQuestionsButton(true);
      setDisplayedQuestions(originalQuestions.slice(0, numDisplayedQuestions));
    };
  }, [query]);

  useEffect(() => setDisplayedQuestions(questions.slice(0, numDisplayedQuestions)), [questions]);

  const handleQueryInput = e => setQuery(e.target.value);

  const handleShowMoreQuestions = () => {
    if ((questions.length - numDisplayedQuestions) < 3) {
      setShowMoreQuestionsButton(false);
      setNumDisplayedQuestions(questions.length);
      setDisplayedQuestions(questions.slice(0, questions.length));
    } else {
      const updatedNum = numDisplayedQuestions + 2;
      setNumDisplayedQuestions(updatedNum);
      setDisplayedQuestions(questions.slice(0, updatedNum));
    }
  };

  const handleAddQuestionModal = () => setShowAddQuestionModal(!showAddQuestionModal);

  return (
    <div className="QA">
      <h3>Questions &amp; Answers</h3>
      <Search
        query={query}
        handleQueryInput={handleQueryInput} />
      <QuestionsList
        questions={displayedQuestions}
        productName={productName} />
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
        <AddQuestion
          productID={productID}
          handleAddQuestionModal={handleAddQuestionModal}
          question={question}
          nickname={nickname}
          email={email}
          setQuestion={setQuestion}
          setNickname={setNickname}
          setEmail={setEmail} />
        : null
      }
    </div>
  );
}

export default QuestionsAndAnswers;

QuestionsAndAnswers.propTypes = {
  productID: PropTypes.number,
  productName: PropTypes.string
}