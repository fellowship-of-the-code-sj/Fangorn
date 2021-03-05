const questionsModel = require('../models/questions.js');

module.exports = {
  getQuestions: (req, res) => {
    const product_id = req.params.product_id;

    questionsModel.getAllQuestions(product_id)
      .then(response => {
        const questions = response.data.results;
        res.status(200).send(questions);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  },
  postQuestion: (req, res) => {
    const body_params = req.body;

    questionsModel.postQuestion(body_params)
      .then((data) => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(404));
  },
  postAnswer: (req, res) => {
    const question_id = req.params.question_id;
    const body_params = req.body;

    questionsModel.postAnswer(question_id, body_params)
      .then((data) => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(404));
  },
  putQuestionHelpful: (req, res) => {
    const question_id = req.params.question_id;

    questionsModel.putQuestionHelpful(question_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(404));
  },
  putQuestionReport: (req, res) => {
    const question_id = req.params.question_id;

    questionsModel.putQuestionReport(question_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(404));
  },
  putAnswerHelpful: (req, res) => {
    const answer_id = req.params.answer_id;

    questionsModel.putAnswerHelpful(answer_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(404));
  },
  putAnswerReport: (req, res) => {
    const answer_id = req.params.answer_id;

    questionsModel.putAnswerReport(answer_id)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(404));
  }
};