const createProductObjectData = (data) => {

  data.productObj.default_style = findDefaultStyle(data.stylesArr);
  data.productObj.rating = ratingsAverage(data.ratingsObj);
  return data.productObj;
}

const findDefaultStyle = (styles) => {

  for (var i = 0; i < styles.length; i++) {
    if (styles[i]['default?']) {
      return styles[i];
    }
  }
  return styles[0];

}

const ratingsAverage = (ratings) => {
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

const comparisonTable = (currentProduct, relatedProduct) => {

  var resultObj = {};
  currentProduct.forEach((product) => {
    if (product.value) {
      resultObj[product.value] = [true, false];
    }
  });

  relatedProduct.forEach((product) => {
    if (product.value) {
      if (resultObj[product.value]) {
        resultObj[product.value] = [true, true];
      } else {
        resultObj[product.value] = [false, true];
      }
    }

  });
  return resultObj;
 }

export default { createProductObjectData, comparisonTable };
