import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function RelatedActionButton({ actionButtonListener }) {

  return (
    <div className="action-button">
      <span onClick={actionButtonListener}>
        <ion-icon name="star-outline"></ion-icon>
      </span>
    </div>
  )
}

RelatedActionButton.propTypes = {
  actionButtonListener: PropTypes.func
}