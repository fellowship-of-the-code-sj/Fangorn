import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Overview from '../client/src/components/Overview/Overview.jsx';
import ProductInfo from '../client/src/components/Overview/ProductInfo.jsx';

describe('Overview', () => {
  it('should render Overview component', () => {
    const wrapper = shallow(<Overview/>);
    expect(wrapper.find('.overview').length).toBe(1);
  })
});

describe('Product Information', () => {
  it('should render ProductInfo component', () => {
    const wrapper = shallow(<ProductInfo/>);
    expect(wrapper.find('.productInfo').length).toBe(1);
  })
})