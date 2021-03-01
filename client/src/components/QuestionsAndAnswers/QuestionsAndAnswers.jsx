import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import myBestestGetter from 'axios';

var QuestionsAndAnswers = props => {
  const [ questions, setQuestions ] = useState([]);

  // effectively componentDIdMount because we are explicitly saying
  // that we aren't watching anything
  useEffect(() => {
    // TODO: handle the /questions route on the server
    myBestestGetter.get('http://localhost:404/questions')
      .then(response => {
        setQuestions(response.data);
      })
  }, []);

  return (
    <div>
      <h3>Questions &amp; Answers</h3>
      <Search />
      <QuestionsList />
      <div>
        <MoreAnsweredQuestions />
        <AddQuestion />
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;