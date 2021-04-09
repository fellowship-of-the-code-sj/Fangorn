const axios = require('axios');
// const { apiKey } = require('../../configure.js');
const { url } = require('../apiURL.js');

// axios.defaults.headers.common['Authorization'] = apiKey;
axios.defaults.headers.common['Authorization'] = process.env.API_KEY;

module.exports = {

  // GET REQUEST TO THE Atelier Products API
  get: (endpoint, callback) => {
    //console.log(url.endpoint);
    axios.get(url + endpoint)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  put: (endpoint, callback) => {
    //console.log(url.endpoint);
    axios.put(url + endpoint)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}