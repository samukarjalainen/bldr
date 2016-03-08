/**
 * db.js - initialize mongodb database via mongoose orm
 *
 * @type {*|exports|module.exports}
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bldr', function () {
  console.log('mongodb connected');
});

module.exports = mongoose;
