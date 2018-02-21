function sort (params) {
  //get fields + tri asc or desc
  //sortBy
}


function sortBy (JSON, field, primer) {
  let key = primer
    ? function (x) { return primer(x[field]) }
    : function (x) { return x[field] }

  field = !field ? 1 : -1

  return function (a, b) {
    return a = key(a), b = key(b), field * ((a > b) - (b > a))
  }
}

module.exports = sort