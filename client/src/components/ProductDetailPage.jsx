import React from 'react';
import serverRequest from '../../helperFunctions/serverRequest.js'
import Overview from './Overview/Overview.jsx'
import RelatedAndOutfits from './RelatedOutfit/RelatedAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import helperFunctions from '../../helperFunctions/helperFunctions.js';
const PORT = 404;

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {productInfo: {}};
  }


  componentDidMount() {
    serverRequest.get(`http://localhost:${PORT}/Overview`, {itemID: 13025}, (result) => {
      this.setState({ productInfo: result.data })
    });
  }

  render() {
    return (
      <div>
        <div className='primaryComponent'>
          <Overview productID={13023} />
        </div>

        <div className='secondaryComponent'>
        {
          this.state.productInfo.productObj?
          <RelatedAndOutfits productID={13025} productInfo={helperFunctions.createProductObjectData(this.state.productInfo)} />
          : <RelatedAndOutfits productID={13025} />
        }
          <QuestionsAndAnswers productID={13025} />
          <RatingsAndReviews productID={13023} />
        </div>
      </div>
    )
  }
}

export default ProductDetailPage;
