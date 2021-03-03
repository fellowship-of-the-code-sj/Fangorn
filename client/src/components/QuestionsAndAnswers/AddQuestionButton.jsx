import React from 'react';
import PropTypes from 'prop-types';

const AddQuestions = ({ handleAddQuestionModal }) => {
  return <button onClick={handleAddQuestionModal}>ADD A QUESTION +</button>
};

export default AddQuestions;

AddQuestions.propTypes = {
  handleAddQuestionModal: PropTypes.function
}