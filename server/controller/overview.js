const products = require('../models/products.js');
const reviews = require('../models/reviews.js');

module.exports = {
  get: (req, res) => {
    console.log('query', req.query.itemID);
    console.log('body', req.body.itemID);
    products.getProductInfo(req.query.itemID, (err, results) => {
      if (err) {
        console.log(1);
        res.status(404);
        res.end();
      } else {
        let productObj = results.data;
        products.getProductStyles(req.query.itemID, (err, results) => {
          if (err) {
            console.log(2);
            res.status(404);
            res.end();
          } else {
            let stylesArr = results.data.results;
            reviews.getMeta(req.query.itemID, (err, results) => {
              if (err) {
                console.log(3);
                res.status(404);
                res.end();
              } else {
                let ratingsObj = results.data.ratings;
                console.log(ratingsObj);
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