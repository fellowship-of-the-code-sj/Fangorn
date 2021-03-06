import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RelatedItemCard from './RelatedItemCard.jsx';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import helperFunctions from '../../../helperFunctions/helperFunctions.js';
import ComparisonTable from './ComparisonTable.jsx';

const RelatedItemsList = ({ relatedItemsList, productInfo, productSelect, listUpdate }) => {

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


  return (
    <div key={listUpdate} className='itemsList'>
      <h3 className='listTitle' >Related Products</h3>
      {
        relatedItemsList.length?
        <Carousel containerClass='carouselContainer' draggable={false} itemClass='carouselItems' partialVisible={true} responsive={helperFunctions.responsive}>
          {
            relatedItemsList.map((item) => {
              return <RelatedItemCard listUpdate={listUpdate} productSelect={productSelect} actionButtonListener={actionButtonListener} productInfo={productInfo} key={item.id} cardData={item}></RelatedItemCard>;
            })
          }

        </Carousel>
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

export default RelatedItemsList;

RelatedItemsList.propTypes = {
  relatedItemsList: PropTypes.array,
  productInfo: PropTypes.object,
  productSelect: PropTypes.func,
  listUpdate: PropTypes.bool
}
