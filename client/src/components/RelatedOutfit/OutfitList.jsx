import React, { useState, useEffect } from 'react';
import OutfitListCard from './OutfitListCard.jsx';

const OutfitList = (props) => {
  return (
    <div className='outfitList'>
      {
        props.outfitList.length ?
        props.outfitList.map((item) => {
          return <OutfitListCard key={item.id} cardData={item.id}></OutfitListCard>
        })
        :<div className='outfitListCard'>{'nothing'}</div>
      }
    </div>
  )
}

export default OutfitList;