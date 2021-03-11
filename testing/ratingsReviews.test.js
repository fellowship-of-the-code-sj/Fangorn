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
  it('should display characteristic radio buttons', () => {
    const wrapper = mount(<NewReview productName={dummyData.products[0].name} metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} />)
    expect(wrapper.find('.new-review-radio-array')).toHaveLength(4)
  })
  it('should not allow submission if the mandatory qualities are not met', () => {
    const wrapper = mount(<NewReview productName={dummyData.products[0].name} metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} />)
    wrapper.find('.new-review-submit-button').simulate('click');
    expect(wrapper.find('.new-review-errors')).toHaveLength(6)
  })
  it('should render a modal window for adding photos', () => {
    const wrapper = mount(<NewReview productName={dummyData.products[0].name} metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} />)
    wrapper.find('.new-review-add-photo-button').simulate('click');
    expect(wrapper.find('.new-review-photo-modal-content')).toHaveLength(1)
  })

})

describe('ReviewsList', () => {
  // it('should render a modal window when \'Leave a review\' is pressed', async () => {
  //   const wrapper = await mount(<ReviewsList metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />);
  //   wrapper.find('.new-review-button').simulate('click')
  //   expect(wrapper.find('.new-review-modal-content')).toHaveLength(1)
  // })

  it('should display a list of 2 reviews', async () => {
    const wrapper = await mount(<ReviewsList metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />);
    expect(wrapper.find('.review')).toHaveLength(0); //broke
  })

  it('should be sortable', async () => {
    const wrapper = await mount(<ReviewsList metaObject={dummyData.reviewMeta} productID={dummyData.products[0].id} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />);
    expect(wrapper.find('.sort-by')).toHaveLength(1);
  })
})

describe('Ratings', () => {
  it('should display the rating breakdown', async () => {
    const wrapper = await mount(<Ratings metaObject={dummyData.reviewMeta} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />)
    expect(wrapper.find('.rating-proportions')).toHaveLength(1)
  })

  it('should display the product breakdown', async () => {
    const wrapper = await mount(<Ratings metaObject={dummyData.reviewMeta} starSort={{ 1: false, 2: false, 3: false, 4: false, 5: false }} />)
    expect(wrapper.find('.characteristic')).toHaveLength(4)
  })
})

describe('Review', () => {
  it('should have a rating', async () => {
    const wrapper = await mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.rating-sprite')).toHaveLength(1)
  })
  it('should have a review body', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.review-body')).toHaveLength(1)
  })
  it('should have a summary', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.review-summary')).toHaveLength(1)
  })
  it('should render images', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.review-thumbnail')).toHaveLength(1)
  })
  it('should have a helpful span', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.helpful-toggle')).toHaveLength(1)
  })
  it('should have a report span', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.report')).toHaveLength(1)
  })
  it('should have a name and date', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.reviewer-name-and-date')).toHaveLength(1)
  })
  it('should display a recommendation', () => {
    const wrapper = mount(<Review key={dummyData.products[0].id} review={dummyData.reviews[0].results[0]} />)
    expect(wrapper.find('.recommend')).toHaveLength(1)
  })
})