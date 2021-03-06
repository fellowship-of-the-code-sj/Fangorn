import React from 'react';
import PropTypes from 'prop-types';
import captureQandA from '../../hoc/captureQandA';

const AddQuestionButton = ({ handleAddQuestionModal, logger }) => {
  return (
    <button
      className="question-buttons"
      onClick={e => {
        handleAddQuestionModal(e);
        logger(e);
      }}>ADD A QUESTION +</button>
  );
};

export default captureQandA(AddQuestionButton);

AddQuestionButton.propTypes = {
  handleAddQuestionModal: PropTypes.func,
  logger: PropTypes.func
}