import React from 'react';
import serverRequest from '../../helperFunctions/serverRequest.js'
import Overview from './Overview/Overview.jsx'
import RelatedAndOutfits from './RelatedOutfit/RelatedAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import helperFunctions from '../../helperFunctions/helperFunctions.js';
import URL from '../URL';

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {productId: 13023, productInfo: {}, listUpdate: false, darkMode: false};
    this.productSelect = this.productSelect.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }


  componentDidMount() {
    serverRequest.get(`http://localhost/Overview`, {itemID: this.state.productId}, (result) => {
      this.setState({ productInfo: result.data })
    });
  }

  productSelect(id) {
    this.setState({ productId: id, listUpdate: !this.state.listUpdate });
    serverRequest.get(`http://localhost/Overview`, { itemID: id }, (result) => {
      this.setState({ productInfo: result.data })
    });
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode})
  }

  render() {
    return (
      <div className={ this.state.darkMode? 'productDetailPageDark': 'productDetailPageLight' }>
        <div className="flex banner">
          <div className="vertical-centering logo">Logo</div>
          <div className="flex-grow"></div>
          <div className="flex vertical-centering">
            <div className="site-search">
              <input type="text"></input>
            </div>
            <div>
              <ion-icon size="large" name="search-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className='primaryComponent'>
          <div className='darkModeButton'>
            <label>
              <input onClick={this.toggleDarkMode} type="checkbox"></input>
              <span className={ this.state.darkMode? 'slider round dark': 'slider round' }>
                {
                  !this.state.darkMode?
                  <div className='darkModeMoon'>
                    <ion-icon name="moon"></ion-icon>
                  </div>
                  :
                  <div className='darkModeSun'>
                    <ion-icon name="sunny"></ion-icon>
                  </div>
                }
              </span>
            </label>
          </div>
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
            this.state.productInfo.productObj ?
              <RelatedAndOutfits productSelect={this.productSelect}
                productID={this.state.productId}
                productInfo={helperFunctions.createProductObjectData(this.state.productInfo)}
                listUpdate={this.state.listUpdate}
              />
              : <RelatedAndOutfits productSelect={this.productSelect}
                productID={this.state.productId} />
          }
          <QuestionsAndAnswers productID={this.state.productId} productName={this.state.productInfo.productObj?.name} />
          <RatingsAndReviews productName={this.state.productInfo.productObj?.name} productID={this.state.productId} />
        </div>
      </div>
    )
  }
}

export default ProductDetailPage;

