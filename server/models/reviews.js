const apiRequest = require('../apiServer/apiRequest.js');
const axios = require('axios');
const { apiKey } = require('../../configure.js');
const { url } = require('../apiURL.js');

axios.defaults.headers.common['Authorization'] = apiKey;

module.exports = {
  //Sends API request for reviews metadata

  getMeta: (productId, callback) => {
    var url = `/reviews/meta?product_id=${productId}`;
    apiRequest.get(url, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  report: (reviewId, callback) => {
    apiRequest.put(`/reviews/${reviewId}/report`, (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  },
  helpful: (reviewId, callback) => {
    apiRequest.put(`/reviews/${reviewId}/helpful`, (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  },
  getAll: (params, callback) => {
    axios.get(`${url}/reviews`, params)
      .then((results) => {
        callback(null, results)
      })
      .catch((err) => {
        callback(err, null)
      })
  },
  postReview: (params, callback) => {
    axios.post(`${url}/reviews`, params)
      .then(() => {
        callback();
      })

      .catch((err) => {
        callback(err)
      })
  }
}