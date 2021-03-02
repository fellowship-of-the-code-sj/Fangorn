import React from 'react';
import ProductInfo from './ProductInfo.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="overview">
        <h1>Overview</h1>
        <ProductInfo />
      </div>
    )
  }
}

export default Overview;