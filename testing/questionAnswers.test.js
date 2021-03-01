import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionsAndAnswers from '../client/src/components/QuestionsAndAnswers/QuestionsAndAnswers.jsx';

describe('<QuestionsAndAnswers />', () => {
  it('should render without throwing an error', () => {
    shallow(<QuestionsAndAnswers />);
  });

  it('should render an h1 tag', () => {
    const wrapper = shallow(<QuestionsAndAnswers />);
    expect(wrapper.find('h1').length).toEqual(1);
  });
});