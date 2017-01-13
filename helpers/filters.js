module.exports.filterByField = function(field, value) {
  return function(elem) {
    return elem[field] == value;
  }
}
