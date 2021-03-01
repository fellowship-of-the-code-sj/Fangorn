import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Overview from '../client/src/components/Overview/Overview.jsx';

describe('Overview', () => {
  it('should render Overview component', () => {
    const wrapper = shallow(<Overview/>);
    expect(wrapper.find('.overview').length).toBe(1);
  })
});