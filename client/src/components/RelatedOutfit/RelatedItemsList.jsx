import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RelatedItemCard from './RelatedItemCard.jsx';

const RelatedItemsList = ({ relatedItemsList }) => {

  //state for controlling the carousel
  const [ carouselInput, setCarouselInput] = useState({start: 0, end: 4});

  //event listener for scrolling right
  const scrollRight = () => {
    if (carouselInput.end < relatedItemsList.length) {
      setCarouselInput({start: carouselInput.start + 1, end: carouselInput.end + 1})
    }
  }

  //event lisetener for scrolling left
  const scrollLeft = () => {
    if (carouselInput.start > 0) {
      setCarouselInput({start: carouselInput.start - 1, end: carouselInput.end - 1})
    }
  }


  return (
    <div className='relatedItemsList'>

      {/* Carousel Scroll Button Left */}
      {
        carouselInput.start === 0 ?
        null
        : <button className='carouselButton' onClick={scrollLeft}> -- </button>
      }
      {
        relatedItemsList.length ?
        relatedItemsList.slice(carouselInput.start, carouselInput.end).map((item) => {
          return <RelatedItemCard key={item.id} cardData={item}></RelatedItemCard>;
        })
        : null
      }

      {/* Carousel Scroll Button Right */}
      {
        carouselInput.end >= relatedItemsList.length ?
        null
        : <button className='carouselButton' onClick={scrollRight} >--</button>
      }
    </div>
  )
};

export default RelatedItemsList;

RelatedItemsList.propTypes = {
  relatedItemsList: PropTypes.array
}