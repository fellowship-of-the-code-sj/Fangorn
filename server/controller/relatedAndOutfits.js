const products = require('./models/products.js');

module.export = {
  get: (endpoint, callback) => {
    products.getRelated(req.query.itemId, (err, data) => {
      if (err) {
        res.send(data);
      }
    });
  }
}