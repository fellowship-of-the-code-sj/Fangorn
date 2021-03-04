import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard.jsx';

const OutfitList = ({ outfitList }) => {
  return (
    <div className='outfitList'>
      {
        outfitList.length ?
        outfitList.map((item) => {
          return <OutfitListCard key={item.id} cardData={item.id}></OutfitListCard>
        })
        :<div className='outfitListCard'>{'nothing'}</div>
      }
    </div>
  )
}

export default OutfitList;

OutfitList.propTypes = {
  outfitList: PropTypes.array
}