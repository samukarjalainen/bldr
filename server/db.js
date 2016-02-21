var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bldr', function () {
  console.log('mongodb connected');
});

module.exports = mongoose;
