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

  const [ listUpdate, setListUpdate] = useState(false);

  //Adds item to outfitList
  const addOutfit = () => {

    //check if the product already exists in the outfit list
    if (!outfitList.list.find(outfitItem => outfitItem.id === productInfo.id)) {
      setListUpdate(!listUpdate);

      outfitList.list.push(productInfo);

      var outfitListArrayString = JSON.stringify(outfitList.list);
      window.localStorage.setItem('outfitList', outfitListArrayString);
      setOutfitList({ list: outfitList.list });
    };
  }

  const removeOutfitItem = (item) => {
    setListUpdate(!listUpdate);

    var index = helperFunctions.findIndex(outfitList.list, item)
    outfitList.list.splice(index, 1);

    var outfitListArrayString = JSON.stringify(outfitList.list);
    window.localStorage.setItem('outfitList', outfitListArrayString);

    setOutfitList({list: outfitList.list });
  }

  return (
    <div key={listUpdate} className='itemsList'>
      <h3 className='listTitle' >Your Outfit</h3>
        <Carousel containerClass="carousel-container" itemClass='carouselItems'
        draggable={false}
        partialVisible={true}
        responsive={helperFunctions.responsive}>
          {/* {outfitList.list.length? null:null} */}

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