import React from 'react';
import PropTypes from 'prop-types';

export default function OutfitActionButton ({ id, removeOutfitItem }) {
  return (
    <React.Fragment>
      <div className='action-button' onClick={
        () => {
          removeOutfitItem(id)
        }
      }>
        <ion-icon name="close-circle-outline"></ion-icon>
      </div>
    </React.Fragment>
  )
}

OutfitActionButton.propTypes = {
  removeOutfitItem: PropTypes.func,
  id: PropTypes.number
}