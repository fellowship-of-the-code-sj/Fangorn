const apiRequest = require('../apiServer/apiRequest.js')

//function to make api request for related items data
module.exports = {

  retrieveAllRelatedItems : (relatedItemIds, sendProductDataToClient) => {

    var relatedItemsPromises = relatedItemIds.map((itemId) => {
      return new Promise((resolve, reject) => {

        apiRequest.get(`/products/${itemId}`, (err, infoData) => {
          if (err) {
            reject(err);
          } else {
            apiRequest.get(`/products/${itemId}/styles`, (err, styleData) => {
              var defaultStyle = defaultStyleSelect(styleData.data.results);
              infoData.data.default_style = defaultStyle;
              if (err) {
                reject(err)
              } else {
                resolve(infoData.data)
              }
            });
          }
        });

      });
    });

    Promise.all(relatedItemsPromises)
      .then((data) => {
        console.log(data);
        sendProductDataToClient(null, data);
      })
      .catch((err) => {
        sendProductDataToClient(err)
      });
  }
}


var defaultStyleSelect = (styles) => {
  for (var i = 0; i < styles.length; i++) {
    if(styles[i]['default?']) {
      return styles[i];
    }
  }
  return styles[0];
}