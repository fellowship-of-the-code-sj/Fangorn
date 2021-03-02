import React, { useState, useEffect } from 'react';


const RelatedItemCard = (props) => {

  return (
    <div className='relatedItemCard'>
      <h6 className='category' >{props.cardData.category}</h6>
      <h5 className='name' >{props.cardData.name}</h5>
      <h6 className='price' >{props.cardData.default_price}</h6>
    </div>
  )
}

export default RelatedItemCard;