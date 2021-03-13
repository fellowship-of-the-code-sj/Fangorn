import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';
import captureQandA from '../../hoc/captureQandA';
import URL from '../../URL';

var AddQuestion = (
  {
    productID, handleAddQuestionModal,
    question, nickname, email,
    setQuestion, setNickname, setEmail,
    logger
  }
) => {
  const [ isQuestionEmpty, setIsQuestionEmpty ] = useState(false);
  const [ isNicknameEmpty, setisNicknameEmpty ] = useState(false);
  const [ isEmailEmpty, setIsEmailEmpty ] = useState(false);
  const [ isEmailFormatInvalid, setIsEmailFormatInvalid ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  useEffect(() => {
    if (isSubmitted) setIsSubmitted(false);
  }, [ question, nickname, email ]);

  const handleChange = e => {
    let value = e.target.value
    if (e.target.name === 'question') setQuestion(value);
    if (e.target.name === 'nickname') setNickname(value);
    if (e.target.name === 'email') setEmail(value);
  };

  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    let questionHasContent = question.length > 0;
    let nicknameHasContent = nickname.length > 0;
    let emailHasContent = email.length > 0;
    let emailFormatIsValid = validateEmail(email);
    let allValid = questionHasContent && nicknameHasContent && emailHasContent && emailFormatIsValid;

    setIsQuestionEmpty(false);
    setisNicknameEmpty(false);
    setIsEmailEmpty(false);
    setIsEmailFormatInvalid(false);
    setIsSubmitted(false);

    if (allValid) {
      let body_params = {
        product_id: productID,
        name: _.escape(nickname),
        email: _.escape(email),
        body: _.escape(question)
      };
      axios.post(`${URL}/questions/add`, body_params)
        .then(() => {
          setQuestion('');
          setNickname('');
          setEmail('');
          setIsSubmitted(true);
        })
        .catch(err => console.error('error', err));
    } else {
      if (!questionHasContent) setIsQuestionEmpty(true);
      if (!nicknameHasContent) setisNicknameEmpty(true);
      if (!emailHasContent) setIsEmailEmpty(true);
      if (!emailFormatIsValid) setIsEmailFormatInvalid(true);
    }
  };

  let highlightErrorQuestion = isQuestionEmpty ? {borderColor: '#eb643f', boxShadow: '0 0 10px #eb643f' } : {};
  let highlightErrorNickname = isNicknameEmpty ? {borderColor: '#eb643f', boxShadow: '0 0 10px #eb643f' } : {};
  let highlightErrorEmail = isEmailEmpty || isEmailFormatInvalid ? {borderColor: '#eb643f', boxShadow: '0 0 10px #eb643f' } : {};

  return (
    <>
      <div className="modal-focus" onClick={handleAddQuestionModal}></div>
      <div className="modal-add">
        <ion-icon
          size="large"
          name="close-outline"
          onClick={handleAddQuestionModal}></ion-icon>
        <div className="center">
          <h1>Your Question</h1>
          { isSubmitted ? <div className="confirmed">Question submitted <ion-icon name="checkmark-outline"></ion-icon></div> : null }
        </div>
        <div className="error-messages">
          {
            isQuestionEmpty || isNicknameEmpty || isEmailEmpty || isEmailFormatInvalid ?
            <div>You must enter the following:</div>
            : null
          }
          { isQuestionEmpty ? <div className="mandatory">Question cannot be empty</div> : null }
          { isNicknameEmpty ? <div className="mandatory">Nickname cannot be empty</div> : null }
          { isEmailEmpty ? <div className="mandatory">Email cannot be empty</div> : null }
          { isEmailFormatInvalid ? <div className="mandatory">Email must be a valid email address</div> : null }
        </div>
        <form>
          <textarea
            name="question"
            rows="7"
            maxLength="1000"
            style={highlightErrorQuestion}
            value={question}
            onChange={handleChange}></textarea>
          <div className="flex">
            <div className="modal-user-data">
              <label>
                <span className="modal-label">What is your nickname?</span><sup className="mandatory">&nbsp;*</sup>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Example: jackson11!"
                  value={nickname}
                  style={highlightErrorNickname}
                  onChange={handleChange}></input>
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
                  placeholder="Example: jack@email.com"
                  style={highlightErrorEmail}
                  value={email}
                  onChange={handleChange}></input>
                <span className="disclaimer-small">For authentication reasons, you will not be emailed</span>
              </label>
            </div>
            <div className="flex-grow"></div>
          </div>
          <input
            type="submit"
            value="Submit"
            onClick={e => {
              handleSubmit(e);
              logger(e);
            }}></input>
        </form>
      </div>
    </>
  );
};

export default captureQandA(AddQuestion);

AddQuestion.propTypes = {
  productID: PropTypes.number,
  handleAddQuestionModal: PropTypes.func,
  question: PropTypes.string,
  nickname: PropTypes.string,
  email: PropTypes.string,
  setQuestion: PropTypes.func,
  setNickname: PropTypes.func,
  setEmail: PropTypes.func,
  logger: PropTypes.func
}