const reviews = require('../models/reviews')

module.exports = {
  report: (req, res) => {
    reviews.report(req.query.reviewId, (err) => {
      console.log('req.query.reviewId: ', req.query.reviewId)
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
  getAll: (req, res) => { }
}