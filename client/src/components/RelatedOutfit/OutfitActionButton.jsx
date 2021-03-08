import React from 'react';
import PropTypes from 'prop-types';
import relatedAndOutfits from '../../hoc/relatedAndOutfits.js';


const OutfitActionButton = ({ id, removeOutfitItem, logger }) => {
  return (
    <React.Fragment>
      <div className='action-button' onClick={
        (e) => {
          removeOutfitItem(id)
          logger(e)
        }
      }>
        <ion-icon name="close-circle"></ion-icon>
      </div>
    </React.Fragment>
  )
}

export default relatedAndOutfits(OutfitActionButton);

OutfitActionButton.propTypes = {
  removeOutfitItem: PropTypes.func,
  id: PropTypes.number,
  logger: PropTypes.func
}