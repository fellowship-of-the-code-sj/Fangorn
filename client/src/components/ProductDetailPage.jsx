import React from 'react';
import serverRequest from '../../serverRequest.js'
import Overview from './Overview/Overview.jsx'
import RelatedAndOutfits from './RelatedOutfit/RelatedAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <div className='primaryComponent'>
          <Overview productID={13023} />
        </div>

        <div className='secondaryComponent'>
          <RelatedAndOutfits productID={13025} />
          <QuestionsAndAnswers productID={13024} />
          <RatingsAndReviews productID={13023} />
        </div>
      </div>
    )
  }
}

export default ProductDetailPage;
