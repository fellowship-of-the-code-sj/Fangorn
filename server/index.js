const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const controller = require('./controller/index.js');
const { relatedItems, overview } = require('./controllers.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', controller.relatedItems.get);

app.put('/RatingsAndReviews/report', controller.ratingsAndReviews.report);

app.put('/RatingsAndReviews/helpful', controller.ratingsAndReviews.helpful);

app.get('/RatingsAndReviews/getAll', controller.ratingsAndReviews.getAll);

app.get('/RatingsAndReviews/getMeta', controller.ratingsAndReviews.getMeta);

app.post('/RatingsAndReviews/postReview', controller.ratingsAndReviews.postReview);

app.get('/Overview', controller.overview.get)

// Resolves get request for endpoint /Overview
app.get('/OverviewOld', (req, res) => {
  overview.getProduct(req.query, (err, product) => {
    if (err) {
      res.sendStatus(err.response.status);
    } else {
      let productObj = product;
      overview.getStyles(req.query, (err, styles) => {
        if (err) {
          res.sendStatus(err.response.status);
        } else {
          const stylesArr = styles;
          overview.getRatings(req.query, (err, ratings) => {
            if (err) {
              res.sendStatus(err.response.status);
            } else {
              const ratingsObj = ratings;
              res.send({ productObj, stylesArr, ratingsObj });
            }
          })
        }
      })
    }
  });
});

app.get('/questions/:product_id', controller.questions.getQuestions);
app.post('/questions/add', controller.questions.postQuestion);
app.post('/questions/:question_id/answer/add', controller.questions.postAnswer);
app.put('/questions/:question_id/helpful', controller.questions.putQuestionHelpful);
app.put('/questions/:question_id/report', controller.questions.putQuestionReport);
app.put('/answer/:answer_id/helpful', controller.questions.putAnswerHelpful);
app.put('/answer/:answer_id/report', controller.questions.putAnswerReport);

app.post('/interactions', controller.interactions.post)

const PORT = 404;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
