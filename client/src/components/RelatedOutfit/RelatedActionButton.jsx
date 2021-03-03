import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function RelatedActionButton({ actionButtonListener }) {

  return (
    <div className="star-action-button">
      <span onClick={actionButtonListener}>★</span>
    </div>
  )
}

RelatedActionButton.propTypes = {
  actionButtonListener: PropTypes.func
}