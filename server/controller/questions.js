const questionsModel = require('../models/questions.js');

module.exports = {
  getQuestions: (req, res) => {
    const productId = req.params.product_id;

    questionsModel.get(productId, (error, result) => {
      if (error) {
        res.sendStatus(404);
      } else {
        const questions = result.data.results;
        res.status(200).send(questions);
      }
    });
  },
  postQuestions: () => {},
  getAnswers: () => {},
  postAnswers: () => {}
};