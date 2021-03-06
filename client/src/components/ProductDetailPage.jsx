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
    this.state = {productId: 13023, productInfo: {}};
    this.productSelect= this.productSelect.bind(this);
  }


  componentDidMount() {
    serverRequest.get(`http://localhost:${PORT}/Overview`, {itemID: this.state.productId}, (result) => {
      this.setState({ productInfo: result.data })
    });
  }

  productSelect(id) {
    this.setState({productId: id });
    serverRequest.get(`http://localhost:${PORT}/Overview`, {itemID: id}, (result) => {
      this.setState({ productInfo: result.data })
    });
  }

  render() {
    return (
      <div>
        <div className='primaryComponent'>
        {
          this.state.productInfo.productObj ?
          <Overview 
            productObj={this.state.productInfo.productObj}
            stylesArr={this.state.productInfo.stylesArr}
            ratingsObj={this.state.productInfo.ratingsObj}
          />
          : <div className="overview"></div>
        }
        </div>

        <div className='secondaryComponent'>
        {
          this.state.productInfo.productObj?
          <RelatedAndOutfits productSelect={this.productSelect}
          productID={this.state.productId}
          productInfo={helperFunctions.createProductObjectData(this.state.productInfo)} />
          : <RelatedAndOutfits productSelect={this.productSelect}
          productID={this.state.productId} />
        }
          <QuestionsAndAnswers productID={13025} productName={this.state.productInfo.productObj?.name} />
          <RatingsAndReviews productID={13023} />
        </div>
      </div>
    )
  }
}

export default ProductDetailPage;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};
