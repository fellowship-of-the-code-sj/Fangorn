const products = require('../models/products.js');
const reviews = require('../models/reviews.js');

module.exports = {
  get: (req, res) => {
    products.getProductInfo(req.query.itemID, (err, results) => {
      if (err) {
        res.status(404);
        res.end();
      } else {
        let productObj = results.data;
        products.getProductStyles(req.query.itemID, (err, results) => {
          if (err) {
            res.status(404);
            res.end();
          } else {
            let stylesArr = results.data.results;
            reviews.getMeta(req.query.itemID, (err, results) => {
              if (err) {
                res.status(404);
                res.end();
              } else {
                let ratingsObj = results.data.ratings;
                res.setHeader('Content-Type', 'text/event-stream');
                res.send({ productObj, stylesArr, ratingsObj });
                res.flush();
              }
            })
          }
        })
      }
    })
  }
}