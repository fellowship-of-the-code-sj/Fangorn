import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard.jsx';
import helperFunctions from '../../../helperFunctions/helperFunctions.js';
import relatedAndOutfits from '../../hoc/relatedAndOutfits.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const OutfitList = ({ productInfo, logger }) => {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'carousel-cards',
    beforeChange: () => {
      logger({target: { nodeName: 'OutfitList Slider' }})
    }
  };


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
        <Slider {...settings} draggable={false}>

          <div className='outfitAddItemCard' onClick={ (e) => {
            addOutfit();
            logger(e);
            }
          } >
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
        </Slider>

    </div>
  )
}

export default relatedAndOutfits(OutfitList);

OutfitList.propTypes = {
  productInfo: PropTypes.object,
  logger: PropTypes.func
}


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 40
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    partialVisibilityGutter: 40
  }
};