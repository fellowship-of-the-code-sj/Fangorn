import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Overview from '../client/src/components/Overview/Overview.jsx';
import ProductInfo from '../client/src/components/Overview/ProductInfo.jsx';
import StyleSelector from '../client/src/components/Overview/StyleSelector.jsx';
import ProductSummary from '../client/src/components/Overview/ProductSummary.jsx';
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

describe('Style Selector', () => {
  it('should render Style Selector component', () => {
    const wrapper = shallow(<StyleSelector
      styles={ data.styles }
      currentStyle={ data.styles[0] }
    />);
    expect(wrapper.find('.styleSelector').length).toBe(1);
  })

  it('should display the current style', () => {
    const wrapper = shallow(<StyleSelector
      styles={ data.styles }
      currentStyle={ data.styles[0] }
    />);
    expect(wrapper.contains(<div id="style_selector_name">Style: Forest Green &amp; Black</div>)).toBe(true);
  })

  it('should render thumbnails of styles dynamically', () => {
    const wrapper = shallow(<StyleSelector
      styles={ data.styles }
      currentStyle={ data.styles[0] }
    />);
    expect(wrapper.find('.style_thumbnail').length).toBe(2)
  })
})

describe('Product Summary', () => {
  it('should render Product Summary', () => {
    const wrapper = shallow(<ProductSummary product={data.products[0]} />);
    expect(wrapper.find('.productSummary').length).toBe(1);
  })

  it('should render slogan and description', () => {
    const wrapper = shallow(<ProductSummary product={data.products[0]} />);
    expect(wrapper.contains(<h3 id="product_summary_slogan">You&apos;ve got to wear shades</h3>)).toBe(true);
    expect(wrapper.contains(<p id="product_summary_description">Where you&apos;re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.</p>)).toBe(true);
  })

  it('should display logos of Twitter, Facebook and Pinterest', () => {
    const wrapper = shallow(<ProductSummary product={data.products[0]} />);
    expect(wrapper.find('img').length).toBe(3);
  })
})