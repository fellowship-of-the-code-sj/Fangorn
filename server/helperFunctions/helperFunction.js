const products = require('../models/products.js');
const reviews = require('../models/reviews.js');

//function to make api request for related items data
module.exports = {

  retrieveAllRelatedItems : (relatedItemIds, sendProductDataToClient) => {
    var relatedItemsPromises = relatedItemIds.map((itemId) => {
      return new Promise((resolve, reject) => {

        //makes api request to get product info
        products.getProductInfo(itemId, (err, infoData) => {
          if (err) {
            reject(err);
          } else {

            products.getProductStyles(itemId, (err, styleData) => {
              //recieves default style
              var defaultStyle = defaultStyleSelect(styleData.data.results);
              //add default style to product Object to return
              infoData.data.default_style = defaultStyle;

              if (err) {
                reject(err)
              } else {
                reviews.getMeta(itemId, (err, ratingsData) => {
                  if (err) {
                    reject(err);
                  } else {

                    //Obtains average rating for all of the ratings passed in
                    var rating = ratingsAverage(ratingsData.data.ratings)
                    infoData.data.rating = rating;
                    resolve(infoData.data);
                  }
                });
              }
            });
          }
        });
      });
    });

    Promise.all(relatedItemsPromises)
      .then((data) => {
        sendProductDataToClient(null, data);
      })
      .catch((err) => {
        sendProductDataToClient(err)
      });
  }
}

// Iterates through array of styles and returns default style
var defaultStyleSelect = (styles) => {
  for (var i = 0; i < styles.length; i++) {
    if(styles[i]['default?']) {
      return styles[i];
    }
  }
  return styles[0];
}

// Iterates through the object of ratings and return the average rating
var ratingsAverage = (ratings) => {
  var sum = 0;
  var count = 0;
  for (var key in ratings) {
    sum += key * ratings[key];
    count += parseInt(ratings[key]);
  }

  if (sum) {
    return sum/count;
  } else {
    return null;
  }
}