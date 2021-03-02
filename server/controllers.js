
const { retrieveAllRelatedItems } = require('./helperFunctions/helperFunction.js');
const apiRequest = require('./apiServer/apiRequest.js');

module.exports = {

  relatedItems: {
    get: (req, res) => {
      //makes get request to Atelier Products API
      apiRequest.get(`/products/${req.query.itemId}/related`, (err, data) => {
        if (err) {
          res.status(err.response.status);
          res.end();
        } else {
          retrieveAllRelatedItems(data.data, (err, productsData) => {
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
          })
        }
      });
    }
  },

  overview: {
    getProduct: (query, callback) => {
      apiRequest.get(`/products/${query.itemID}`, (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results.data);
        }
      })
    },
    // getStyles: (query, callback) => {
    //   apiRequest.get(`/products/${query.itemID}`, (err, results) => {
    //     if (err) {
    //       callback(err, null);
    //     } else {
    //       callback(null, results.data);
    //     }
    //   })
    // }
  }
}