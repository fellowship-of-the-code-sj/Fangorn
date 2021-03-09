import React from 'react';
import { shallow, mount } from 'enzyme';
import dummyData from './dummyData.js';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import axiosHelper from '../client/helperFunctions/serverRequest.js';

import RatingsAndReviews from '../client/src/components/RatingsAndReviews/RatingsAndReviews.jsx';
import NewReview from '../client/src/components/RatingsAndReviews/NewReview.jsx';
import Ratings from '../client/src/components/RatingsAndReviews/Ratings.jsx';
import Review from '../client/src/components/RatingsAndReviews/Review.jsx';
import ReviewsList from '../client/src/components/RatingsAndReviews/ReviewsList.jsx';
describe('Rendering Components', () => {

  it('should render parent without throwing an error', () => {
    shallow(<RatingsAndReviews />);
  });
  it('should render a list of reviews', () => {
    shallow(<ReviewsList productName={dummyData.products[0].name} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }}
      productID={dummyData.products[0].id} />)
  })
  it('should render a single review', () => {
    shallow(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
  })
  it('should render a new review form', () => {
    shallow(<NewReview productName={dummyData.products[0].name} metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} />)
  })
  it('should render ratings for a product', () => {
    shallow(<Ratings metaObject={dummyData.reviewMeta} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />)
  })

});

describe('NewReview', () => {
  it('should have three forms', () => {

  })
  it('should display the name of the product being reviewed', () => {

  })
  it('should only display characteristics relevant to the product', () => {

  })
  it('should not allow submission if the mandatory qualities are not met', () => {

  })
  it('should render a modal window for adding photos', () => {

  })
  it('should submit the review', () => {

  })

})

describe('ReviewsList', () => {
  it('should render a modal window when \'Leave a review\' is pressed', () => {

  })
  it('should display a list of reviews', () => {

  })
  it('should only display 2 reviews at a time', () => {

  })
})

describe('Ratings', () => {
  it('should display the average rating', () => {

  })
  it('should display a percentage of recommendendations', () => {

  })
  it('should display the rating stars, partially filled in', () => {

  })
  it('should display the rating breakdown', () => {

  })
  it('should display the product breakdown', () => {

  })
})

describe('Review', () => {
  it('should have a rating', () => {

  })
  it('should have a review body', () => {

  })
  it('should have a summary', () => {

  })
  it('should render clickable images', () => {

  })
  it('should have a clickable helpful span', () => {

  })
  it('should have a clickable report span', () => {

  })
  it('should have a name and date', () => {

  })
  it('should display a recommendation', () => {

  })
})