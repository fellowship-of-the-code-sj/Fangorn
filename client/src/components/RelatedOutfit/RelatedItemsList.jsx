import React, { useState, useEffectm, useRef } from 'react';
import PropTypes from 'prop-types';
import RelatedItemCard from './RelatedItemCard.jsx';
import helperFunctions from '../../../helperFunctions/helperFunctions.js';
import ComparisonTable from './ComparisonTable.jsx';
import relatedAndOutfits from '../../hoc/relatedAndOutfits.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const RelatedItemsList = ({ relatedItemsList, productInfo, productSelect, listUpdate, logger }) => {

  var slider = useRef();

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: () => {
      logger({target: { nodeName: 'RelatedItemsList Slider' }})
    }
  };

  const [ actionButtonToggle, setActionButtonToggle ] = useState(false);

  const [comparisonData, setComparisonData] = useState({});

   //event listener for action button
  const actionButtonListener = (event, comparedItem) => {

    if (!actionButtonToggle) {
      event.stopPropagation();
    }
    setComparisonData(comparedItem);
    setActionButtonToggle(!actionButtonToggle);
  }

  // const resetSliderStart = () => {
  //   slider.current.slickGoTo(0, true)
  // }


  return (
    <div key={listUpdate} className='itemsList'>
      <h3 className='listTitle' >Related Products</h3>
      {
        relatedItemsList.length?
        <Slider ref={slider} {...settings} draggable={false} >
          {
            relatedItemsList.map((item) => {
              return <RelatedItemCard  listUpdate={listUpdate} productSelect={productSelect} actionButtonListener={actionButtonListener} productInfo={productInfo} key={item.id} cardData={item}></RelatedItemCard>;
            })
          }
        </Slider>
        : null
      }
      {
        actionButtonToggle ?
          <div>
            <div className='outerModal' onClick={() => {actionButtonListener()}}></div>
            <ComparisonTable
              comparisionList={ helperFunctions.comparisonTable(productInfo.features, comparisonData.features)}
              currentProductName={productInfo.name}
              relatedProductName={comparisonData.name}
            />
          </ div>
          : null
      }
    </div>
  )
};

export default relatedAndOutfits(RelatedItemsList);

RelatedItemsList.propTypes = {
  relatedItemsList: PropTypes.array,
  productInfo: PropTypes.object,
  productSelect: PropTypes.func,
  listUpdate: PropTypes.bool,
  logger: PropTypes.func
}
