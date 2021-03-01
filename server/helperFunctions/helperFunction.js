const apiRequest = require('../apiServer/apiRequest.js')

//function to make api request for related items data
  module.exports = {

    retrieveAllRelatedItems : (relatedItemIds, sendProductDataToClient) => {

    var relatedItemsPromises = relatedItemIds.map((itemId) => {
      return new Promise((resolve, reject) => {

        apiRequest.get(`/products/${itemId}`, (err, data) => {
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
        sendProductDataToClient(null, data);
      })
      .catch((err) => {
        sendProductDataToClient(err)
      })
  }

}