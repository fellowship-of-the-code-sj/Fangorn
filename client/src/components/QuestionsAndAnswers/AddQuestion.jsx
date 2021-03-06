import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import axios from 'axios';
import regex from '../../../helperFunctions/regex';
import captureQandA from '../../hoc/captureQandA';

var AddQuestion = ({ productID, handleAddQuestionModal, logger }) => {
  const [ question, setQuestion ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
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

  const handleSubmit = e => {
    e.preventDefault();
    let questionHasContent = question.length > 0;
    let nicknameHasContent = nickname.length > 0;
    let emailHasContent = email.length > 0;
    let emailFormatIsValid = regex.email.test(email);
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
      axios.post(`http://localhost:404/questions/add`, body_params)
        .then(() => {
          setQuestion('');
          setNickname('');
          setEmail('');
          setIsSubmitted(true);
        })
        .catch(() => console.error('error'));
    } else {
      if (!questionHasContent) setIsQuestionEmpty(true);
      if (!nicknameHasContent) setisNicknameEmpty(true);
      if (!emailHasContent) setIsEmailEmpty(true);
      if (!emailFormatIsValid) setIsEmailFormatInvalid(true);
    }
  };

  return (
    <React.Fragment>
      <div className="modal-focus" onClick={handleAddQuestionModal}></div>
      <div className="modal-add">
        <div className="center">
          <h1>Your Question</h1>
          { isSubmitted ? <div className="confirmed">Question submitted <ion-icon name="checkmark-outline"></ion-icon></div> : null }
        </div>
        {
          isQuestionEmpty || isNicknameEmpty || isEmailEmpty || isEmailFormatInvalid ?
          <div>You must enter the following:</div>
          : null
        }
        { isQuestionEmpty ? <div className="mandatory">Question cannot be empty</div> : null }
        { isNicknameEmpty ? <div className="mandatory">Nickname cannot be empty</div> : null }
        { isEmailEmpty ? <div className="mandatory">Email cannot be empty</div> : null }
        { isEmailFormatInvalid ? <div className="mandatory">Email must be a valid email address</div> : null }
        <form>
          <textarea
            name="question"
            rows="7"
            maxLength="1000"
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
    </React.Fragment>
  );
};

export default captureQandA(AddQuestion);

AddQuestion.propTypes = {
  productID: PropTypes.number,
  handleAddQuestionModal: PropTypes.func,
  logger: PropTypes.func
}