const express = require('express');
const path = require('path');
const apiRequest = require('../apiServer/apiRequest.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../configure.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', (req, res) => {
  //makes get request to Atelier Products API

  apiRequest.get(`https://app-hrsei-api.herokuapp.com/api/fec2/${config.CAMPUS_CODE}/products/${req.query.itemId}/related`, (err, data) => {

    if (err) {
      res.status(err.response.status);
      res.end();
    } else {
      retrieveAllRelatedItems(data.data, (err, productsData) => {
        if (err) {
          res.status(err.response.status);
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

//function to retrieve all related items
var retrieveAllRelatedItems = (relatedItemIds, sendProductDataToClient) => {

  var relatedItemsPromises = relatedItemIds.map((itemId) => {
    return new Promise((resolve, reject) => {

      apiRequest.get(`https://app-hrsei-api.herokuapp.com/api/fec2/${config.CAMPUS_CODE}/products/${itemId}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.data);
        }
      });
    });
  });

  Promise.all(relatedItemsPromises)
    .then((data) => {
      //console.log(data)
      sendProductDataToClient(null, data);
    })
    .catch((err) => {
      sendProductDataToClient(err)
    })
}
