const products = require('../models/products.js');
const reviews = require('../models/reviews.js');

module.exports = {
  get: (req, res) => {
    products.getProductInfo(req.query.itemID, (err, results) => {
      if (err) {
        res.status(err.response.status);
        res.end();
      } else {
        let productObj = results.data;
        products.getProductStyles(req.query.itemID, (err, results) => {
          if (err) {
            res.status(err.response.status);
            res.end();
          } else {
            let stylesObj = results.data;
            res.send({ productObj, stylesObj });
          }
        })
      }
    })
  }
}