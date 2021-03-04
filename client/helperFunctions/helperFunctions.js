const createObjectData = (data) => {

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

export default { createObjectData };