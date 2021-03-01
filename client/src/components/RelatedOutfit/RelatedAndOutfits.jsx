import React, { useState, useEffect } from 'react';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
const port = 404;

const RelatedAndOutfits = (props) => {

  const [ relatedItems, setRelatedItems ] = useState([]);

  useEffect(() => {
    axiosHelper.get(`http://localhost:${port}/RelatedItems`, {itemId: props.productID}, (data) => {
      setRelatedItems(data.data);
    });
  }, []);

  return (
    <div className='relatedItemsList'>
      {
        relatedItems?
          relatedItems.map((item) => {
            return <div className='relatedItem' key={item.id} >{(item.id)}</div>;
          })
        : <div></div>
      }
    </div>
  )
};

export default RelatedAndOutfits;