import axios from 'axios';

var get = (url, params, callback) => {
  axios.get(url, {
    params: params
  })
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      throw err;
    });
}

export default {get};