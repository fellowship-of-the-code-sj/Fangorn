const apiRequest = require('../apiServer/apiRequest.js');

module.exports = {
  //products enpoint
  getProducts: () => {
  },

  //Sends API request for realted items
  getRelated: (itemId, callback) => {
    var url = `/products/${itemId}/related`;

    apiRequest.get(url, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  //Send API reuqest for product info
  getProductInfo: (itemId, callback) => {
    var url = `/products/${itemId}`;

    apiRequest.get(url, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  //Send API reuqest for product styles
  getProductStyles: (itemId, callback) => {
    var url = `/products/${itemId}/styles`;

    apiRequest.get(url, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }

}

