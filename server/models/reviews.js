const apiRequest = require('../apiServer/apiRequest.js');

module.exports = {
  //Sends API request for reviews metadata

  getMeta: (productId, callback) => {
    var url = `/products/${callback}/reviews/meta`;

    apiRequest.get(url, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
}