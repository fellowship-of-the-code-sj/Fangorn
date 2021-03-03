import React, { useState, useEffect } from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';

const RelatedItemsList = (props) => {
  //console.log(props);
  return (
    <div className='relatedItemsList'>
      {
        props.relatedItemsList.length ?
        props.relatedItemsList.map((item) => {
          return <RelatedItemCard key={item.id} cardData={item} ></RelatedItemCard>;
        })
        : <div className='relatedItemCard' ></div>
      }
    </div>
  )
};

export default RelatedItemsList;