import React, { useState, useEffect } from 'react';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';
const port = 404;

const RelatedAndOutfits = (props) => {

  const [ relatedItems, setRelatedItems ] = useState([]);

  useEffect(() => {
    axiosHelper.get(`http://localhost:${port}/RelatedItems`, {itemId: props.productID}, (data) => {
      setRelatedItems(data.data);
    });
  }, []);

  return (
    <div>
      <RelatedItemsList relatedItemsList={relatedItems}>

      </RelatedItemsList>
      <OutfitList outfitList={[]}>

      </OutfitList>
    </div>
  )
};

export default RelatedAndOutfits;