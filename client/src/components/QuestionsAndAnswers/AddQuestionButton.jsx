import React from 'react';
import PropTypes from 'prop-types';

const AddQuestionButton = ({ handleAddQuestionModal }) => {
  return (
    <button
      className="question-buttons"
      onClick={handleAddQuestionModal}>ADD A QUESTION +</button>
  );
};

export default AddQuestionButton;

AddQuestionButton.propTypes = {
  handleAddQuestionModal: PropTypes.func
}