import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';
import helperFunctions from '../../../helperFunctions/helperFunctions.js';
import ComparisonTable from './ComparisonTable.jsx';

const RelatedItemCard = ({ cardData, actionButtonListener }) => {

  //State for comparison table toggle
  const [ actionButtonToggle, setActionButtonToggle] = useState(false)

  return (
    <div className='itemCard'>

      {/* Star Action Button */}
      <RelatedActionButton actionButtonListener={() => {
        actionButtonListener(cardData)
      }}/>
      <div className='photoBorder'>
        {
          //Checks to see if image exists, if not returns default image
            cardData.default_style.photos[0].url ?
            <img className='itemCardImg' src={cardData.default_style.photos[0].url}></img>
            : <img className='itemCardImg' src='https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'></img>
        }
      </div>
      {/* category and name */}
      <h6 className='cardCategory' >{cardData.category}</h6>
      <h5 className='cardItemName' >{cardData.name}</h5>

      {
        //checks to see if product contains sales price, if so, displays sales price, else original price
        cardData.default_style.sale_price ?
        <h6 className='cardItemSalePrice' >{'$' + cardData.default_style.sale_price}</h6>
        : <h6 className='cardItemPrice' >{'$' + cardData.default_style.original_price}</h6>
      }

      {/* Star Rating */}
      <div className="star-ratings">
        <StarRating rating={cardData.rating}/>
      </div>

    </div>
  )
}

export default RelatedItemCard;

RelatedItemCard.propTypes = {
  cardData: PropTypes.object,
  actionButtonListener: PropTypes.func
}