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
    let body_params = {};
    body_params.product_id = productID;
    body_params.name = nickname;
    body_params.email = email;
    body_params.body = _.escape(question);
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
      <div className="add-question-modal">
        <h1>Your Question</h1>
        <form>
          <textarea
            name="question"
            value={question}
            onChange={e => handleChange(e)}></textarea>
          <label>
            What is your nickname?
            <input
              type="text"
              name="nickname"
              placeholder="Example: jackson11!"
              value={nickname}
              onChange={e => handleChange(e)}></input>
            For privacy reasons, do not use your full name or email address
          </label>
          <label>
            Your email
            <input
              type="text"
              name="email"
              placeholder="Why did you like the product or not?"
              value={email}
              onChange={e => handleChange(e)}></input>
            For authentication reasons, you will not be emailed
          </label>
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