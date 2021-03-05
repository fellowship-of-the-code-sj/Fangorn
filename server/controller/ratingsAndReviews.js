const reviews = require('../models/reviews')

module.exports = {
  report: (req, res) => {
    reviews.report(req.query.reviewId, (err) => {
      if (err) {
        console.log('error reporting review');
        res.end();
      } else {
        console.log('review has been reported')
        res.end();
      }
    })
  },
  helpful: (req, res) => {
    reviews.helpful(req.query.reviewId, (err) => {
      if (err) {
        console.log('error marking review as helpful');
        res.end();
      } else {
        console.log('review has been marked helpful')
        res.end();
      }
    })
  },
  getAll: (req, res) => {
    reviews.getAll({ params: req.query }, (err, results) => {
      if (err) {
        console.log('Error getting all reviews');
        res.end();
      } else {
        console.log('successfully got all reviews')
        res.send(results.data.results);
      }
    })
  },
  getMeta: (req, res) => {
    reviews.getMeta(req.query.product_id, (err, results) => {
      if (err) {
        console.log('Error getting review metadata')
        res.end();
      } else {
        console.log('Successfully got review metadata')
        res.send(results.data);
      }
    })
  },
  postReview: (req, res) => {
    reviews.postReview(req.body, (err) => {
      console.log('req.body: ', req.body)
      if (err) {
        console.log('Error posting new review, error: ', err);
        res.end();
      } else {
        console.log('Successfully posted new review');
        res.end();
      }
    })
  }
}