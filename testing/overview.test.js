import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Overview from '../client/src/components/Overview/Overview.jsx';
import ProductInfo from '../client/src/components/Overview/ProductInfo.jsx';
import data from './dummyData.js';

describe('Overview', () => {
  it('should render Overview component', () => {
    const wrapper = shallow(<Overview/>);
    expect(wrapper.find('.overview').length).toBe(1);
  })
});

describe('Product Information', () => {
  it('should render ProductInfo component with data', () => {
    const wrapper = shallow(<ProductInfo 
      product={ data.products[0] }
      currentStyle={ data.styles[0] }
      ratings={ data.reviewMeta.ratings }
    />);
    expect(wrapper.find('.productInfo').length).toBe(1);
  })

  it('should display the average rating and # of ratings', () => {
    const wrapper = shallow(<ProductInfo 
      product={ data.products[0] }
      currentStyle={ data.styles[0] }
      ratings={ data.reviewMeta.ratings }
    />);
    expect(wrapper.find('#product_info_rating').length).toBe(1);
  })

  it('should display the product category', () => {
    const wrapper = shallow(<ProductInfo 
      product={ data.products[0] }
      currentStyle={ data.styles[0] }
      ratings={ data.reviewMeta.ratings }
    />);
    expect(wrapper.find('#product_info_category').length).toBe(1);
  })

  it('should display the product name', () => {
    const wrapper = shallow(<ProductInfo 
      product={ data.products[0] }
      currentStyle={ data.styles[0] }
      ratings={ data.reviewMeta.ratings }
    />);
    expect(wrapper.find('#product_info_name').length).toBe(1);
  })

  it('should display the product price', () => {
    const wrapper = shallow(<ProductInfo 
      product={ data.products[0] }
      currentStyle={ data.styles[0] }
      ratings={ data.reviewMeta.ratings }
    />);
    expect(wrapper.find('#product_info_price').length).toBe(1);
  })
})