import React, { useState, useEffect } from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';

const RelatedItemsList = (props) => {

  return (
    <div className='relatedItemsList'>
      {
        props.relatedItemsList.length ?
        props.relatedItemsList.map((item) => {
          return <RelatedItemCard key={item.id} cardData={item.id} ></RelatedItemCard>;
        })
        : <div className='relatedItemCard' ></div>
      }
    </div>
  )
};

export default RelatedItemsList;