import React from 'react';
import PropTypes from 'prop-types';

const IndividualAnswer = ({ answer }) => {
  let date = new Date(answer.date);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const months = ['Jauary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = `${months[month]}, ${day} ${year}`;
  let bolded = answer.answerer_name === 'Seller' ? { fontWeight: "bold" } : null;
  return (
    <div>
      <div className="flex">
        <div>A:&nbsp;</div>
        <div>{answer.body}</div>
        <div className="flex-grow"></div>
      </div>
      <div className="flex">
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div>
            by <span style={bolded}>{answer.answerer_name}</span>, {date}
          </div>
        <div className="spacer">|</div>
        <div>
            Helpful? <a href="#" className="link-clear">
            <span className="underline">Yes</span> ({answer.helpfulness})
            </a>
          </div>
        <div className="spacer">|</div>
        <div><a href="#">Report</a></div>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};

export default IndividualAnswer;

IndividualAnswer.propTypes = {
  answer: PropTypes.object
}