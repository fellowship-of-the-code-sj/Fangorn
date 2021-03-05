import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';

var AddQuestion = ({ productID, handleAddQuestionModal }) => {
  const [ question, setQuestion ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleChange = e => {
    let value = e.target.value
    if (e.target.name === 'question') setQuestion(value);
    if (e.target.name === 'nickname') setNickname(value);
    if (e.target.name === 'email') setEmail(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let body_params = {
      product_id: productID,
      name: _.escape(nickname),
      email: _.escape(email),
      body: _.escape(question)
    };
    axios.post(`http://localhost:404/questions/add`, body_params)
      .then(() => {
        setQuestion('');
        setNickname('');
        setEmail('');
      })
      .catch(() => console.error('error'));
  }

  return (
    <React.Fragment>
      <div className="modal-focus" onClick={handleAddQuestionModal}></div>
      <div className="modal-add">
        <h1>Your Question</h1>
        <form>
          <textarea
            name="question"
            rows="7"
            maxLength="1000"
            value={question}
            onChange={e => handleChange(e)}></textarea>
          <div className="flex">
            <div className="modal-user-data">
              <label>
                <span className="modal-label">What is your nickname?</span><sup className="mandatory">&nbsp;*</sup>
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

export default AddQuestion;

AddQuestion.propTypes = {
  productID: PropTypes.number,
  handleAddQuestionModal: PropTypes.func
}