import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import PropTypes from 'prop-types';
import OutfitActionButton from './OutfitActionButton.jsx';
import relatedAndOutfits from '../../hoc/relatedAndOutfits.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const OutfitListCard = ({ cardData, removeOutfitItem, logger}) => {

  var defaultImage = "https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png";

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    slide: 'img',
    draggable: false,
    beforeChange: () => {
      logger({target: { nodeName: 'OutfitCard Image Slider' }})
    }
  };

  const [ carouselImages, setCarouselImages ] = useState(false);

  const [ cardImage, setCardImage ] = useState(0);

  const pictureCarousel = () => {
    setCarouselImages(!carouselImages);
  }

  const updateCardImage = (e, index) => {
    e.stopPropagation();
    setCardImage(index);
  }

  return (

    <div className='itemCard'>
      <OutfitActionButton id={cardData.id} removeOutfitItem={removeOutfitItem}/>
      <div onMouseEnter={pictureCarousel} onMouseLeave={pictureCarousel} className='photoBorder'>
        {
          //Checks to see if image exists, if not returns default image
          cardData.default_style.photos[0].url ?
          <img className='itemCardImg' src={cardData.default_style.photos[cardImage].thumbnail_url} alt='No Image'></img>
          : <img className='itemCardImg' src={defaultImage} alt='No Image'></img>
        }
        {
          carouselImages?
          <div onClick={(e) => {e.stopPropagation()}} className='relatedCarouselImage'>
            <Slider {...settings}>
              {
                cardData.default_style.photos.map((image, index) => {
                  return <img onClick={(e) => {
                    updateCardImage(e, index)
                    logger(e)
                  }}
                  className='relatedImageCarousel' key={index} src={image.thumbnail_url} alt='No Image'></img>
                })
              }
            </Slider>
          </div>
          : null
        }
      </div>

      {/* category and name */}
      <h2 className='cardCategory' >{cardData.category}</h2>
      <h3 className='cardItemName' >{cardData.name}</h3>

      {
        //checks to see if product contains sales price, if so, displays sales price, else original price
        cardData.default_style.sale_price ?
        <h4 className='cardItemSalePrice' >{'$' + cardData.default_style.sale_price}</h4>
        : <h4 className='cardItemPrice' >{'$' + cardData.default_style.original_price}</h4>
      }

      {/* Star Rating */}
      <div className="star-ratings">
        <StarRating rating={cardData.rating}/>
      </div>
    </div>
  )
}

export default relatedAndOutfits(OutfitListCard);

OutfitListCard.propTypes = {
  cardData: PropTypes.object,
  removeOutfitItem: PropTypes.func,
  logger: PropTypes.func
}