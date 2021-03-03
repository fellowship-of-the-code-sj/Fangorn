import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RelatedItemCard from './RelatedItemCard.jsx';

const RelatedItemsList = ({ relatedItemsList }) => {
  //console.log(props);
  return (
    <div className='relatedItemsList'>
      {
        relatedItemsList.length ?
        relatedItemsList.map((item) => {
          return <RelatedItemCard key={item.id} cardData={item}></RelatedItemCard>;
        })
        : <div className='relatedItemCard' ></div>
      }
    </div>
  )
};

export default RelatedItemsList;

RelatedItemsList.propTypes = {
  relatedItemsList: PropTypes.array,
  // actionButtonListener: PropTypes.func
}