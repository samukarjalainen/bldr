var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

mongoose.model('users', usersSchema);
