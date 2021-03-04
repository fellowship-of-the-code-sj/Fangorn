import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';

const IndividualQuestion = ({ question }) => {
  const [ answers, setAnswers ] = useState([]);
  const [ showAddAnswerModal, setShowAddAnswerModal ] = useState(false);
  const [ showingMoreAnswers, setShowingMoreAnswers ] = useState(false);
  const [ showMoreAnswersButton, setShowMoreAnswersButton ] = useState(false);
  const [ displayedAnswers, setDisplayedAnswers ] = useState([]);
  // this should really be handled by the API..
  const [ submittedHelpful, setSubmittedHelpful ] = useState(false);
  const [ submittedReport, setSubmittedReport ] = useState(false);

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
    setDisplayedAnswers(allAnswers.slice(0, numToDisplay));
  }, []);

  const handleSubmitHelpful = e => {
    e.preventDefault();
    const { question_id } = question;
    axios.put(`http://localhost:404/questions/${question_id}/helpful`)
      .then(() => {
        setSubmittedHelpful(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  const handleSubmitReport = e => {
    e.preventDefault();
    const { question_id } = question;
    axios.put(`http://localhost:404/questions/${question_id}/report`)
      .then(() => {
        setSubmittedReport(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  const handleAddAnswerModal = e => {
    e.preventDefault();
    setShowAddAnswerModal(!showAddAnswerModal);
  };

  const handleShowMoreAnswers = e => {
    e.preventDefault();
    if (showingMoreAnswers) {
      setShowingMoreAnswers(false);
      setDisplayedAnswers(answers.slice(0,2));
    } else {
      setShowingMoreAnswers(true);
      setDisplayedAnswers(answers.slice());
    }
  };

  let loadOrCollapseAnswers = showingMoreAnswers ? 'COLLAPSE ANSWERS' : 'SEE MORE ANSWERS';

  return (
    <div>
        <div className="flex">
          <div>Q:&nbsp;</div>
          <div>{question.question_body}</div>
          <div className="flex-grow"></div>
          <div>
            Helpful?&nbsp;
            {
              submittedHelpful ?
              <span>Yes ({question.question_helpfulness + 1})</span>
              : <a href="#" className="link-clear" onClick={handleSubmitHelpful}>
                  <span className="underline">Yes</span> ({question.question_helpfulness})
                </a>
            }
          </div>
          <div className="spacer">|</div>
          <div>
            {
              submittedReport ?
              <span>Reported!</span>
              : <a href="#" onClick={handleSubmitReport}>Report</a>
            }
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" className="link-clear" onClick={handleShowMoreAnswers}>{loadOrCollapseAnswers}</a>
          </React.Fragment>
          : null
        }
        {
          showAddAnswerModal ?
          <AddAnswer
            questionId={question.question_id}
            questionBody={question.question_body}
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