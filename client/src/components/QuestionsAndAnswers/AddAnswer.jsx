import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'underscore';

var AddAnswer = ({ questionId, questionBody, productName, handleAddAnswerModal }) => {
  const [ answer, setAnswer ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleChange = e => {
    let value = e.target.value
    if (e.target.name === 'answer') setAnswer(value);
    if (e.target.name === 'nickname') setNickname(value);
    if (e.target.name === 'email') setEmail(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let body_params = {
      name: nickname,
      email,
      body: _.escape(answer)
    };
    axios.post(`http://localhost:404/questions/${questionId}/answer/add`, body_params)
      .then(() => {
        setAnswer('');
        setNickname('');
        setEmail('');
      })
      .catch(() => console.error('error'));
  }

  return (
    <React.Fragment>
      <div className="modal-focus" onClick={handleAddAnswerModal}></div>
      <div className="modal-add">
        <h1>Submit your Answer</h1>
        <h2>{productName}: {questionBody}</h2>
        <form>
          <label>
            <span className="modal-label">Your Answer</span><sup className="mandatory">&nbsp;*</sup>
            <textarea
              name="answer"
              rows="5"
              maxLength="1000"
              value={answer}
              onChange={e => handleChange(e)}></textarea>
          </label>
          <div className="flex">
            <div className="modal-user-data">
              <label>
                <span className="modal-label">What is your nickname</span><sup className="mandatory">&nbsp;*</sup>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Example: jackson11!"
                  value={nickname}
                  onChange={e => handleChange(e)}></input>
                <span className="disclaimer-small">For privacy reasons, do not use your full name or email address</span>
              </label>
            </div>
            <div className="flex-grow"></div>
          </div>
          <div className="flex">
            <div className="modal-user-data">
              <label>
                <span className="modal-label">Your email</span><sup className="mandatory">&nbsp;*</sup>
                <input
                  type="text"
                  name="email"
                  placeholder="Why did you like the product or not?"
                  value={email}
                  onChange={e => handleChange(e)}></input>
                <span className="disclaimer-small">For authentication reasons, you will not be emailed</span>
              </label>
            </div>
            <div className="flex-grow"></div>
          </div>
          <input
            type="submit"
            value="Submit"
            onClick={e => handleSubmit(e)}></input>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddAnswer;

AddAnswer.propTypes = {
  questionId: PropTypes.number,
  questionBody: PropTypes.string,
  productName: PropTypes.string,
  handleAddAnswerModal: PropTypes.func
}