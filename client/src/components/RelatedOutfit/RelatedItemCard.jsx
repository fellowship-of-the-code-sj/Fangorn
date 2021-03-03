import React, { useState, useEffect } from 'react';


const RelatedItemCard = (props) => {
  return (
    <div className='relatedItemCard'>
      {
        //Checks to see if image exists, if not returns default image
        props.cardData.default_style.photos[0].url ?
        <img className='relatedProductImg' src={props.cardData.default_style.photos[0].url}></img>
        : <img className='relatedProductImg' src='https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'></img>
      }
      <h6 className='category' >{props.cardData.category}</h6>
      <h5 className='name' >{props.cardData.name}</h5>
      {
        //checks to see if product contains sales price, if so, displays sales price, else original price
        props.cardData.default_style.sale_price ?
        <h6 className='salePrice' >{props.cardData.default_style.sale_price}</h6>
        : <h6 className='price' >{props.cardData.default_style.original_price}</h6>
      }
    </div>
  )
}

export default RelatedItemCard;