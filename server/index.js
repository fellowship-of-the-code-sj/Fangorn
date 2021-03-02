const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getQuestions, relatedItems } = require('./controller/index.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', relatedItems);

app.put('/RatingsAndReviews/helpful', ratingsAndReviews.helpful);
app.put('/RatingsAndReviews/report', ratingsAndReviews.report);

const PORT = 404;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
