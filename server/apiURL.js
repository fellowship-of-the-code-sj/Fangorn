// const config = require('../configure.js');

// module.exports = { url: `https://app-hrsei-api.herokuapp.com/api/fec2/${config.CAMPUS_CODE}`}
module.exports = { url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}`}