import React from 'react';
import axios from'axios';
import Overview from './Overview/Overview.jsx'
import RelatedAndOutfits from './RelatedOutfit/RelatedAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Overview />
        <RelatedAndOutfits />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    )
  }
}

export default ProductInformation;
