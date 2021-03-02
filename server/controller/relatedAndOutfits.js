const products = require('../models/products.js');
const helper = require('../helperFunctions/helperFunction.js');

module.exports = {

  get: (req, res) => {
    // Function to get all of the related items id array
    products.getRelated(req.query.itemId, (err, data) => {
      if (err) {
        res.status(err.response.status);
        res.end()
      } else {
         //helper function to make request to get all of the relatedItems product info
         helper.retrieveAllRelatedItems(data.data, (err, productsData) => {
          if (err) {
            //check if error status exists
            if (err.response) {
              res.status(err.response.status);
            } else {
              res.status(404);
            }
            res.end();

          } else {
            res.status(data.status);
            res.send(productsData);
          }
        });
      }
    });
  }

}