const interactionsModel = require('../models/interactions.js');

module.exports = {
  post: (req, res) => {
    const bodyParams = req.body;

    interactionsModel.post(bodyParams)
      .then(() => {
        console.log('noice');
        res.sendStatus(201)
      })
      .catch(() => res.sendStatus(422));
  }
};