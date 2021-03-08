const axios = require('axios');
const { url } = require('../apiURL.js');

module.exports = {
  post: (body_params) => axios.post(`${url}/interactions`, body_params)
};