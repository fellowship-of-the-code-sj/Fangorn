import React from 'react';
import { shallow, mount } from 'enzyme';
import RatingsAndReviews from '../client/src/components/RatingsAndReviews/RatingsAndReviews.jsx';
import dummyData from './dummyData.js';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import axiosHelper from '../client/helperFunctions/serverRequest.js';

describe('Rendering <RatingsAndReviews />', () => {

  it('should render without throwing an error', () => {
    shallow(<RatingsAndReviews />);

  });

});