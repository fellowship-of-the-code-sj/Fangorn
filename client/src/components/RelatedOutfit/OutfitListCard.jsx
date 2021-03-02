import React, { useState, useEffect } from 'react';

const OutfitListCard = (props) => {
  return (
    <div className='outfitListCard'>{props.cardData}</div>
  )
}

export default OutfitListCard;