import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import PropTypes from 'prop-types';
import OutfitActionButton from './OutfitActionButton.jsx';


const OutfitListCard = ({ cardData, removeOutfitItem }) => {
  return (

    <div className='relatedItemCard'>
      <OutfitActionButton id={cardData.id} removeOutfitItem={removeOutfitItem}/>
      {
        //Checks to see if image exists, if not returns default image
        cardData.default_style.photos[0].url ?
        <img className='relatedProductImg' src={cardData.default_style.photos[0].url}></img>
        : <img className='relatedProductImg' src='https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'></img>
      }

      {/* category and name */}
      <h6 className='category' >{cardData.category}</h6>
      <h5 className='name' >{cardData.name}</h5>

      {
        //checks to see if product contains sales price, if so, displays sales price, else original price
        cardData.default_style.sale_price ?
        <h6 className='salePrice' >{cardData.default_style.sale_price}</h6>
        : <h6 className='price' >{cardData.default_style.original_price}</h6>
      }

      {/* Star Rating */}
      <div className="star-ratings">
        <StarRating rating={cardData.rating}/>
      </div>
    </div>
  )
}

export default OutfitListCard;

OutfitListCard.propTypes = {
  cardData: PropTypes.object,
  removeOutfitItem: PropTypes.func
}