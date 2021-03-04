const axios = require('axios');
const { url } = require('../apiURL.js');

module.exports = {
  getAllQuestions: (product_id) => axios.get(`${url}/qa/questions/?product_id=${product_id}`),
  postQuestion: (body_params) => axios.post(`${url}/qa/questions`, body_params),
  putQuestionHelpful: (question_id) => axios.put(`${url}/qa/questions/${question_id}/helpful`),
  putQuestionReport: (question_id) => axios.put(`${url}/qa/questions/${question_id}/report`),
  putAnswerHelpful: (answer_id) => axios.put(`${url}/qa/answers/${answer_id}/helpful`),
  putAnswerReport: (answer_id) => axios.put(`${url}/qa/answers/${answer_id}/report`)
};