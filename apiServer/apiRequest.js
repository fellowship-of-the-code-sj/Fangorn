const axios = require('axios');
const { apiKey } = require('../configure.js');

axios.defaults.headers.common['Authorization'] = apiKey;
module.exports = {

// GET REQUEST TO THE Atelier Products API
  get: (url, callback) => {
    axios.get(url)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) =>  {
        callback(err, null);
      });
  }

}