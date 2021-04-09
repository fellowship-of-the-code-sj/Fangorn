import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'underscore';
import captureQandA from '../../hoc/captureQandA';
import URL from '../../URL';

const IndividualAnswer = ({ answer, logger }) => {
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
    axios.put(`/answer/${answer.id}/helpful`)
      .then(() => {
        setSubmittedHelpful(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  const handleSubmitReport = e => {
    e.preventDefault();
    axios.put(`/answer/${answer.id}/report`)
      .then(() => {
        setSubmittedReport(true);
      })
      .catch(() => {
        console.error('error');
      });
  };

  return (
    <div className="answer">
      <div className="answer-body">{_.unescape(answer.body)}</div>
      <div className="secondary-text flex">
        <div>
            by <span style={bolded}>{_.unescape(answer.answerer_name)}</span>, {date}
          </div>
        <div className="spacer">|</div>
        <div>
          Helpful?&nbsp;&nbsp;&nbsp;
          {
            submittedHelpful ?
            <span>Yes ({answer.helpfulness + 1})</span>
            : <a
              href="#"
              className="link-clear"
              onClick={e => {
                handleSubmitHelpful(e);
                logger(e);
              }}>
                <span className="underline">Yes</span> ({answer.helpfulness})
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
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};

export default captureQandA(IndividualAnswer);

IndividualAnswer.propTypes = {
  answer: PropTypes.object,
  logger: PropTypes.func
}