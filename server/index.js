const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { relatedItems, overview } = require('./controllers.js');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Retrieves get request for endpoint /RelatedItems
app.get('/RelatedItems', relatedItems.get);

// Resolves get request for endpoint /Overview
app.get('/Overview', (req, res) => {
  overview.getProduct(req.query, (err, product) => {
    if (err) {
      res.sendStatus(err.response.status);
    } else {
      let productObj = product;
      overview.getStyles(req.query, (err, styles) => {
        if (err) {
          res.sendStatus(err.response.status);
        } else {
          const stylesObj = styles;
          res.send({ productObj, stylesObj });
        }
      })
      // res.send(productObj);
    }
  });
})

const PORT = 404;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
