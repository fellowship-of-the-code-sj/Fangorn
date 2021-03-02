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
    <div className='relatedItemsAndOutfits'>
      <h3 className='relatedItemsHeader' >Related Products</h3>
      <RelatedItemsList relatedItemsList={relatedItems}>

      </RelatedItemsList>
      <h3 className='yourOutfit' >Your Outfit</h3>
      <OutfitList outfitList={[]}>

      </OutfitList>
    </div>
  )
};

export default RelatedAndOutfits;