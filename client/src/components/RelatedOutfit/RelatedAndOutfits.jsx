import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosHelper from '../../../helperFunctions/serverRequest.js';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';
import URL from '../../URL';

const RelatedAndOutfits = ({ productID, productInfo, productSelect, listUpdate }) => {

  const [ relatedItems, setRelatedItems ] = useState([]);

  useEffect(() => {
    axiosHelper.get(`http://localhost/RelatedItems`, {itemId: productID}, (data) => {
      setRelatedItems(data.data);
    });
  }, [productID]);

  return (
    <div className='relatedItemsAndOutfits'>
      <RelatedItemsList productSelect={productSelect} productInfo={productInfo} relatedItemsList={relatedItems}>

      </RelatedItemsList>
      <OutfitList productInfo={productInfo}>

      </OutfitList>
    </div>
  )
};

export default RelatedAndOutfits;

RelatedAndOutfits.propTypes = {
  productID: PropTypes.number,
  productInfo: PropTypes.object,
  productSelect: PropTypes.func,
  listUpdate: PropTypes.bool
}