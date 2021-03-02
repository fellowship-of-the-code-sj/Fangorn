const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller/index.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', controller.relatedItems);

const PORT = 404;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
