const express = require('express');
const path = require('path');
const apiRequest = require('./apiServer/apiRequest.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const { retrieveAllRelatedItems } = require('./helperFunctions/helperFunction.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', (req, res) => {
  //makes get request to Atelier Products API
  apiRequest.get(`/products/${req.query.itemId}/related`, (err, data) => {
    if (err) {
      res.status(err.response.status);
      res.end();
    } else {
      retrieveAllRelatedItems(data.data, (err, productsData) => {
        if (err) {
          //check if error status exists
          if (err.response) {
            res.status(err.response.status);
          } else {
            res.status(404);
          }
          res.end();

        } else {
          res.status(data.status);
          res.send(productsData);
        }
      })
    }
  });
});

const PORT = 404;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
