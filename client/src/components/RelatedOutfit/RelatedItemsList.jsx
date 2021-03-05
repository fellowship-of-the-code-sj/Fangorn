import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RelatedItemCard from './RelatedItemCard.jsx';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const RelatedItemsList = ({ relatedItemsList, productInfo }) => {

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
      {
        relatedItemsList.length?
        <Carousel responsive={responsive}>
          {
            relatedItemsList.map((item) => {
              return <RelatedItemCard productInfo={productInfo} key={item.id} cardData={item}></RelatedItemCard>;
            })
          }

        </Carousel>
        : null
      }

      {/* Carousel Scroll Button Left */}
      {/* {
        carouselInput.start === 0 ?
        null
        : <button className='carouselLeftButton' onClick={scrollLeft}> -- </button>
      } */}
      {/* {
        relatedItemsList.length ?
        relatedItemsList.slice(carouselInput.start, carouselInput.end).map((item) => {
          return <RelatedItemCard productInfo={productInfo} key={item.id} cardData={item}></RelatedItemCard>;
        })
        : null
      } */}

      {/* Carousel Scroll Button Right */}
      {/* {
        carouselInput.end >= relatedItemsList.length ?
        null
        : <button className='carouselRightButton' onClick={scrollRight} >--</button>
      } */}
    </div>
  )
};

export default RelatedItemsList;

RelatedItemsList.propTypes = {
  relatedItemsList: PropTypes.array,
  productInfo: PropTypes.object
}


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};
