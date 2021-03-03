const apiRequest = require('../apiServer/apiRequest.js');
const querystring = require('querystring');

module.exports = {
  get: (product_id, callback) => {
    // const queryString = querystring.stringify({ product_id });
    apiRequest.get(`/qa/questions/?product_id=${product_id}`, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result);
      }
    })
  }
};