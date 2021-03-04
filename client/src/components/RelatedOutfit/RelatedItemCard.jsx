import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';


const RelatedItemCard = ({ cardData}) => {

  //State for comparison table toggle
  const [ actionButtonToggle, setActionButtonToggle] = useState(false)

  //event listener for action button
  const actionButtonListener = () => {
    setActionButtonToggle(!actionButtonToggle);
  }

  return (
    <div className='relatedItemCard'>

      {/* Star Action Button */}
      <RelatedActionButton actionButtonListener={actionButtonListener}/>
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

      {/* Modal Element */}
      {
        actionButtonToggle ?
          <div>
            <div className='outerModal' onClick={actionButtonListener}>OUTER MODAL </div>
            <div className='innerModal' >INNER MODAL </div>
          </ div>
          : null
      }

    </div>
  )
}

export default RelatedItemCard;

RelatedItemCard.propTypes = {
  cardData: PropTypes.object,
}