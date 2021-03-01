import React from 'react';
import { shallow, mount } from 'enzyme';
import RatingsAndReviews from '../client/src/components/RatingsAndReviews/RatingsAndReviews.jsx';

describe('Rendering Components', () => {

  it('should render without throwing an error', () => {
    shallow(<RatingsAndReviews />);
  });

});