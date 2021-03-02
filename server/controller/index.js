const { retrieveAllRelatedItems } = require('../helperFunctions/helperFunction.js');
const apiRequest = require('../apiServer/apiRequest.js');

module.exports.relatedItems = (req, res) => {
  //makes get request to Atelier Products API
  // apiRequest.get(`/products/${req.query.itemId}/related`, (err, data) => {
  //   if (err) {
  //     res.status(err.response.status);
  //     res.end();
  //   } else {
  //     retrieveAllRelatedItems(data.data, (err, productsData) => {
  //       if (err) {
  //         //check if error status exists
  //         if (err.response) {
  //           res.status(err.response.status);
  //         } else {
  //           res.status(404);
  //         }
  //         res.end();

  //       } else {
  //         res.status(data.status);
  //         res.send(productsData);
  //       }
  //     })
  //   }
  // })


};

// something like this should be the only things in this file:
module.exports.questions = require('./questions.js');