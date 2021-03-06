import React from 'react';
import { shallow, mount } from 'enzyme';
import _ from 'underscore';
import QuestionsAndAnswers from '../client/src/components/QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Search from '../client/src/components/QuestionsAndAnswers/Search.jsx';
import QuestionsList from '../client/src/components/QuestionsAndAnswers/QuestionsList.jsx';
import MoreAnsweredQuestions from '../client/src/components/QuestionsAndAnswers/MoreAnsweredQuestions.jsx';
import AddQuestion from '../client/src/components/QuestionsAndAnswers/AddQuestion.jsx';
import AddQuestionButton from '../client/src/components/QuestionsAndAnswers/AddQuestionButton.jsx';
import IndividualQuestion from '../client/src/components/QuestionsAndAnswers/IndividualQuestion.jsx';
import AnswerList from '../client/src/components/QuestionsAndAnswers/AnswerList.jsx';
import IndividualAnswer from '../client/src/components/QuestionsAndAnswers/IndividualAnswer.jsx';
import dummyData from './dummyData';

describe('QuestionsAndAnswers', () => {
  it('should render an Search component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<Search />)).toEqual(true);
  });

  it('should render an QuestionsList component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<QuestionsList />)).toEqual(true);
  });

  it('should render an MoreAnsweredQuestions component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<MoreAnsweredQuestions />)).toEqual(false);
  });

  it('should render an AddQuestion component', () => {
    const wrapper = shallow(<QuestionsAndAnswers productID={1}/>);
    expect(wrapper.containsMatchingElement(<AddQuestionButton />)).toEqual(true);
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
    console.log(wrapper);
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

xdescribe('IndividualQuestion', () => {
});

describe('AnswerList', () => {
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

describe('MoreAnsweredQuestions', () => {
  it('should render a button', () => {
    const wrapper = shallow(<MoreAnsweredQuestions />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});

describe('AddQuestions', () => {
  it('should render a button', () => {
    const wrapper = shallow(<AddQuestionButton />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});