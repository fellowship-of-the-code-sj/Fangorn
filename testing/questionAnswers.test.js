import React from 'react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import _ from 'underscore';
import QuestionsAndAnswers from '../client/src/components/QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Search from '../client/src/components/QuestionsAndAnswers/Search.jsx';
import QuestionsList from '../client/src/components/QuestionsAndAnswers/QuestionsList.jsx';
import MoreAnsweredQuestions from '../client/src/components/QuestionsAndAnswers/MoreAnsweredQuestions.jsx';
import AddQuestion from '../client/src/components/QuestionsAndAnswers/AddQuestion.jsx';
import AddAnswer from '../client/src/components/QuestionsAndAnswers/AddAnswer.jsx';
import AddQuestionButton from '../client/src/components/QuestionsAndAnswers/AddQuestionButton.jsx';
import IndividualQuestion from '../client/src/components/QuestionsAndAnswers/IndividualQuestion.jsx';
import AnswerList from '../client/src/components/QuestionsAndAnswers/AnswerList.jsx';
import IndividualAnswer from '../client/src/components/QuestionsAndAnswers/IndividualAnswer.jsx';
import dummyData from './dummyData';
import mockResponse from './__mocks__/QA-request.js';

describe('QuestionsAndAnswers', () => {
  it('should render an Search component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<Search />)).toEqual(true);
  });

  it('should render an QuestionsList component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<QuestionsList />)).toEqual(true);
  });

  it('should render a MoreAnsweredQuestions component if there are more than 2 Questions', async () => {
    // jest.mock('axios');
    axios.get = jest.fn().mockResolvedValue(mockResponse.questions);

    let wrapper;
    await act(async () => wrapper = await mount(<QuestionsAndAnswers productID={1}/>));
    wrapper.update();
    expect(wrapper.containsMatchingElement(<MoreAnsweredQuestions />)).toEqual(true);
  });

  it('should not render a MoreAnsweredQuestions component if there are 2 or less Questions', async () => {
    jest.mock('axios');
    axios.get = jest.fn().mockResolvedValue(mockResponse.oneQuestion);

    let wrapper;
    await act(async () => wrapper = await mount(<QuestionsAndAnswers productID={1}/>));
    wrapper.update();
    expect(wrapper.containsMatchingElement(<MoreAnsweredQuestions />)).toEqual(false);
  });

  it('should render an AddQuestion component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<AddQuestionButton />)).toEqual(true);
  });

  it('should render an AddQuestion component', async () => {
    let wrapper;
    await act(async () => {
      wrapper = await mount(<QuestionsAndAnswers productID={1}/>);
    })
    const questionButton = wrapper.find(AddQuestionButton);
    questionButton.simulate('click');
    wrapper.update();
    expect(wrapper.containsMatchingElement(<AddQuestion />)).toEqual(true);
  });
});

describe('Search', () => {
  it('should render an input text field', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('input[type="text"]').length).toEqual(1);
  });

  it('should have a placeholder text that says "Have a question? Search for answers…"', () => {
    const wrapper = shallow(<Search />);
    const placeholderText = 'Have a question? Search for answers…';
    expect(wrapper.find(`input[placeholder="${placeholderText}"]`).length).toEqual(1);
  });
});

describe('QuestionsList', () => {
  it('should render 3 questions', () => {
    const dummyQuestions = dummyData.questions.results;
    const wrapper = shallow(<QuestionsList questions={dummyQuestions} />);
    expect(wrapper.find(IndividualQuestion).length).toEqual(3);
  });
});

describe('IndividualQuestion', () => {
  it('should render the question body', () => {
    const oneQuestion = mockResponse.questions.data[1];
    const wrapper = mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    expect(wrapper.find('div.QA-important').at(1).text()).toEqual('Can I wash it?');
  });

  it('should render the correct number of helpful votes', async () => {
    const oneQuestion = mockResponse.questions.data[1];
    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    });
    wrapper.update();
    expect(wrapper.find('div a').at(0).text()).toEqual('Yes (7)');
  });

  it('should render an incremented number of helpful votes', async () => {
    const oneQuestion = mockResponse.questions.data[1];
    axios.put = jest.fn().mockResolvedValue(200);

    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} logger={() => {}} />);
      wrapper.update();
      wrapper.find('div a').at(0).simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('div span').at(0).text()).toEqual('Yes (8)');
  });

  it('should render a Report button', () => {
    const oneQuestion = mockResponse.questions.data[1];
    let wrapper = mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    expect(wrapper.find('div a').at(1).text()).toEqual('Report');
  });

  it('should render "Reported!" text when the Report button is clicked', async () => {
    const oneQuestion = mockResponse.questions.data[1];
    axios.put = jest.fn().mockResolvedValue(200);

    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} logger={() => {}} />);
      wrapper.update();
      wrapper.find('div a').at(1).simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('div span').at(1).text()).toEqual('Reported!');
  });

  it('should render an Add Answer button', () => {
    const oneQuestion = mockResponse.questions.data[1];
    let wrapper = mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    expect(wrapper.find('div a').at(2).text()).toEqual('Add Answer');
  });

  it('should render an Answer list if there are answers', async () => {
    const oneQuestion = mockResponse.questions.data[1];
    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    });
    wrapper.update();
    expect(wrapper.find(AnswerList).length).toEqual(1);
  });

  it('should not render an Answer list if there are no answers', async () => {
    const oneQuestion = mockResponse.questions.data[0];
    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
    });
    wrapper.update();
    expect(wrapper.find(AnswerList).length).toEqual(0);
  });

  it('should render an Add Answer modal when the Add Answer button is clicked', async () => {
    const oneQuestion = mockResponse.questions.data[0];
    let wrapper;
    await act(async () => {
      wrapper = await mount(<IndividualQuestion question={oneQuestion} productName={'some_product'} />);
      wrapper.find('div a').at(2).simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(AddAnswer).length).toEqual(1);
  });
});

xdescribe('AnswerList', () => {
  it('should render 5 IndividualAnswer components', () => {
    const dummyAnswer = dummyData.questions.results[1].answers;
    let has5Answers = _.values(dummyAnswer);
    const wrapper = shallow(<AnswerList answers={has5Answers} />);
    expect(wrapper.find(IndividualAnswer).length).toEqual(5);
  });

  it('should not render an AnswerList component when there are no answers', () => {
    const dummyAnswer = dummyData.questions.results[0].answers;
    let hasNoAnswers = _.values(dummyAnswer);
    const wrapper = shallow(<AnswerList answers={hasNoAnswers} />);
    expect(wrapper.find(IndividualAnswer).length).toEqual(0);
  });
});

xdescribe('MoreAnsweredQuestions', () => {
  it('should render a button', () => {
    const wrapper = shallow(<MoreAnsweredQuestions />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});

describe('AddQuestion', () => {
  it('should render a Submit button', () => {
    const wrapper = mount(<AddQuestion />);
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });

  it('should render a Submit button', () => {
    const wrapper = mount(<AddQuestion />);
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });
});