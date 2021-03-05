import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'underscore';

const IndividualAnswer = ({ answer }) => {
  // this should really be handled by the API..
  const [ submittedHelpful, setSubmittedHelpful ] = useState(false);
  const [ submittedReport, setSubmittedReport ] = useState(false);

  let date = new Date(answer.date);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const months = ['Jauary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = `${months[month]}, ${day} ${year}`;
  let bolded = answer.answerer_name === 'Seller' ? { fontWeight: "bold" } : null;

  const handleSubmitHelpful = e => {
    e.preventDefault();
    axios.put(`http://localhost:404/answer/${answer.id}/helpful`)
      .then(() => {
        setSubmittedHelpful(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  const handleSubmitReport = e => {
    e.preventDefault();
    axios.put(`http://localhost:404/answer/${answer.id}/report`)
      .then(() => {
        setSubmittedReport(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  return (
    <div className="answer">
      <div className="flex">
        <div className="answer-body">{_.unescape(answer.body)}</div>
        <div className="flex-grow"></div>
      </div>
      <div className="secondary-text flex">
        <div>
            by <span style={bolded}>{_.unescape(answer.answerer_name)}</span>, {date}
          </div>
        <div className="spacer">|</div>
        <div>
          Helpful?&nbsp;
          {
            submittedHelpful ?
            <span>Yes ({answer.helpfulness + 1})</span>
            : <a href="#" className="link-clear" onClick={handleSubmitHelpful}>
                <span className="underline">Yes</span> ({answer.helpfulness})
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
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};

export default IndividualAnswer;

IndividualAnswer.propTypes = {
  answer: PropTypes.object
}