import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard.jsx';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import helperFunctions from '../../../helperFunctions/helperFunctions.js';

const OutfitList = ({ productInfo }) => {

  if (!window.localStorage.outfitList) {
    var list = [];
  } else {
    var list = JSON.parse(window.localStorage.outfitList);
  }

  const [ outfitList, setOutfitList ] = useState( { list } )

  const [ partialView, setPartialView] = useState(list.length > 2? true: false);

  //Adds item to outfitList
  const addOutfit = () => {

    //check if the product already exists in the outfit list
    if (!outfitList.list.find(outfitItem => outfitItem.id === productInfo.id)) {
      outfitList.list.push(productInfo);

      if (outfitList.list.length === 3) {
        setPartialView(true);
      }

      var outfitListArrayString = JSON.stringify(outfitList.list);
      window.localStorage.setItem('outfitList', outfitListArrayString);
      setOutfitList({ list: outfitList.list });
    };
  }

  const removeOutfitItem = (item) => {
    var index = helperFunctions.findIndex(outfitList.list, item)
    outfitList.list.splice(index, 1);

    if (outfitList.list.length === 2) {
      setPartialView(false);
    }

    var outfitListArrayString = JSON.stringify(outfitList.list);
    window.localStorage.setItem('outfitList', outfitListArrayString);

    setOutfitList({list: outfitList.list });
  }

  return (
    <div className='itemsList'>
      <h3 className='listTitle' >Your Outfit</h3>
      <Carousel containerClass="carousel-container" itemClass='carouselItems'
      draggable={false}
      partialVisible={partialView}
      responsive={helperFunctions.responsive}>
        {outfitList.list.length? null:null}

        <div className='outfitAddItemCard' onClick={addOutfit} >
          <div className='addOutfitText'>
            ADD TO OUTFIT
            <br></br>
            <ion-icon name="add-circle-outline"></ion-icon>
          </div>

        </div>
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