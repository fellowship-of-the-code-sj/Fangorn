import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import captureQandA from '../../hoc/captureQandA';

const IndividualQuestion = ({ question, productName, logger }) => {
  // Answer List
  const [ answers, setAnswers ] = useState([]);
  const [ showAddAnswerModal, setShowAddAnswerModal ] = useState(false);
  const [ showingMoreAnswers, setShowingMoreAnswers ] = useState(false);
  const [ showMoreAnswersButton, setShowMoreAnswersButton ] = useState(false);
  const [ displayedAnswers, setDisplayedAnswers ] = useState([]);
  /* this should really be handled by the API.. */
  const [ submittedHelpful, setSubmittedHelpful ] = useState(false);
  const [ submittedReport, setSubmittedReport ] = useState(false);
  // Add Answer
  const [ answer, setAnswer ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');

  useEffect(() => {
    const allAnswers = _.values(question.answers);
    const sellerAnswers = _.filter(allAnswers, answer => answer.answerer_name === 'Seller');
    const otherAnswers = _.filter(allAnswers, answer => answer.answerer_name !== 'Seller');
    const sortedSellerAnswers = _.sortBy(sellerAnswers, answer => answer.helpfulness).reverse();
    const sortedOtherAnswers = _.sortBy(otherAnswers, answer => answer.helpfulness).reverse();

    const sortedAnswers = sortedSellerAnswers.concat(sortedOtherAnswers);
    setAnswers(sortedAnswers);

    const numAnswers = sortedAnswers.length;
    let numToDisplay;
    if (numAnswers > 2) {
      setShowMoreAnswersButton(true);
      numToDisplay = 2;
    } else {
      numToDisplay = numAnswers;
    }
    setDisplayedAnswers(sortedAnswers.slice(0, numToDisplay));
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

  return (
    <div>
        <div className="question-head flex">
          <div className="QA-important">Q:&nbsp;&nbsp;</div>
          <div className="QA-important">{_.unescape(question.question_body)}</div>
          <div className="flex-grow"></div>
          <div className="secondary-text flex">
            <div>
              Helpful?&nbsp;&nbsp;&nbsp;
              {
                submittedHelpful ?
                <span>Yes ({question.question_helpfulness + 1})</span>
                : <a href="#" className="link-clear" onClick={e => {
                  handleSubmitHelpful(e);
                  logger(e);
                }}>
                    <span className="underline">Yes</span> ({question.question_helpfulness})
                  </a>
              }
            </div>
            <div className="spacer">|</div>
            <div>
              {
                submittedReport ?
                <span>Reported!</span>
                : <a href="#" onClick={e => {
                  handleSubmitReport(e);
                  logger(e);
                }}>Report</a>
              }
            </div>
            <div className="spacer">|</div>
            <div>
              <a
                  href="#"
                  onClick={e => {
                    handleAddAnswerModal(e);
                    logger(e);
                  }}>Add Answer</a>
            </div>
          </div>
        </div>
        {
          displayedAnswers.length > 0 ?
          <div className="flex">
              <div className="QA-important">A:&nbsp;&nbsp;</div>
                <AnswerList
                  answers={displayedAnswers}
                  showMoreAnswersButton={showMoreAnswersButton}
                  handleShowMoreAnswers={handleShowMoreAnswers}
                  loadOrCollapseAnswers={ showingMoreAnswers ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS' } />
              <div className="flex-grow"></div>
          </div>
          : null
        }
        {
          showAddAnswerModal ?
          <AddAnswer
            questionId={question.question_id}
            questionBody={question.question_body}
            productName={productName}
            answer={answer}
            nickname={nickname}
            email={email}
            setAnswer={setAnswer}
            setNickname={setNickname}
            setEmail={setEmail}
            handleAddAnswerModal={handleAddAnswerModal}/>
          : null
        }
    </div>
  );
};

export default captureQandA(IndividualQuestion);

IndividualQuestion.propTypes = {
  question: PropTypes.object,
  productName: PropTypes.string,
  logger: PropTypes.func
};