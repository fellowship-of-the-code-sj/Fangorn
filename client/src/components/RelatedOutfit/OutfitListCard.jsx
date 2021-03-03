import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OutfitListCard = ({ cardData }) => {
  return (
    <div className='outfitListCard'>{cardData}</div>
  )
}

export default OutfitListCard;

OutfitListCard.propTypes = {
  cardData: PropTypes.object
}