import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import myBestestGetter from 'axios';

const QuestionsAndAnswers = ({ productID }) => {
  const [ questions, setQuestions ] = useState([]);

  useEffect(() => {
    myBestestGetter.get(`http://localhost:404/Questions/${productID}`)
      .then(response => {
        // console.log(response.data);
        setQuestions(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h3>Questions &amp; Answers</h3>
      <Search />
      <QuestionsList questions={questions} />
      <div>
        <MoreAnsweredQuestions />
        <AddQuestion />
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;

QuestionsAndAnswers.propTypes = {
  productID: PropTypes.number
}