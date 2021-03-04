import React from 'react';
import PropTypes from 'prop-types';

export default function OutfitActionButton ({ id, removeOutfitItem }) {
  return (
    <React.Fragment>
      <div className='OutfitActionButton' onClick={
        () => {
          removeOutfitItem(id)
        }
      }>x</div>
    </React.Fragment>
  )
}

OutfitActionButton.propTypes = {
  removeOutfitItem: PropTypes.func,
  id: PropTypes.number
}