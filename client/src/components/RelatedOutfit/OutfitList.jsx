import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard.jsx';

const OutfitList = ({ productInfo }) => {

  const [ carouselInput, setCarouselInput ] = useState({start: 0, end: 4});

  if (!window.localStorage.outfitList) {
    var list = [];
  } else {
    var list = JSON.parse(window.localStorage.outfitList);
  }

  const [ outfitList, setOutfitList ] = useState( { list } )

  //event listener for scrolling right
  const scrollRight = () => {
    if (carouselInput.end < outfitList.list.length) {
      setCarouselInput({start: carouselInput.start + 1, end: carouselInput.end + 1})
    }
  }

  //event lisetener for scrolling left
  const scrollLeft = () => {
    if (carouselInput.start > 0) {
      setCarouselInput({start: carouselInput.start - 1, end: carouselInput.end - 1})
    }
  }

  //Adds item to outfitList
  const addOutfit = () => {

    //check if the product already exists in the outfit list
    if (!outfitList.list.find(outfitItem => outfitItem.id === productInfo.id)) {
      outfitList.list.push(productInfo);
      var outfitListArrayString = JSON.stringify(outfitList.list);
      window.localStorage.setItem('outfitList', outfitListArrayString);
      setOutfitList({ list: outfitList.list });
    };
  }

  const removeOutfitItem = (item) => {
    var index = outfitList.list.indexOf({ id: item})
    outfitList.list.splice(index, 1);
    var outfitListArrayString = JSON.stringify(outfitList.list);
    window.localStorage.setItem('outfitList', outfitListArrayString);
    setOutfitList({list: outfitList.list });

    if (outfitList.list.length < carouselInput.end) {
      scrollLeft();
    }
  }

  return (
    <div className='relatedItemsList'>

      {/* Carousel Scroll Button Left */}
      {
        carouselInput.start === 0 ?
        null
        : <button className='carouselLeftButton' onClick={scrollLeft}> -- </button>
      }

      <div onClick={addOutfit} className='outfitAddItemCard' >{'ADD Outfit'}</div>
      {
        outfitList.list.length ?
        outfitList.list.slice(carouselInput.start, carouselInput.end).map((item) => {
          return <OutfitListCard cardData={item} removeOutfitItem={removeOutfitItem} ></OutfitListCard>
        })
        : null
      }

      {/* Carousel Scroll Button Right */}
      {
        carouselInput.end >= outfitList.list.length ?
        null
        : <button className='carouselRightButton' onClick={scrollRight} >--</button>
      }

    </div>
  )
}

export default OutfitList;

OutfitList.propTypes = {
  productInfo: PropTypes.object
}