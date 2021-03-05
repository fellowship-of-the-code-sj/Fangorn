import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard.jsx';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import helperFunctions from '../../../helperFunctions/helperFunctions.js';

const OutfitList = ({ productInfo }) => {

  const [ carouselInput, setCarouselInput ] = useState({start: 0, end: 4});

  if (!window.localStorage.outfitList) {
    var list = [];
  } else {
    var list = JSON.parse(window.localStorage.outfitList);
  }

  const [ outfitList, setOutfitList ] = useState( { list } )

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
  }

  return (
    <div className='relatedItemsList'>
      <Carousel responsive={helperFunctions.responsive}>
        <div className='relatedItemCard' onClick={addOutfit} >{'ADD Outfit'}</div>
        {
          outfitList.list.length ?
          outfitList.list.map((item) => {
            return <OutfitListCard key={item.id} cardData={item} removeOutfitItem={removeOutfitItem} ></OutfitListCard>
          })
          : null
        }
      </Carousel>

    </div>
  )
}

export default OutfitList;

OutfitList.propTypes = {
  productInfo: PropTypes.object
}