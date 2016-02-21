var mongoose = require('../db');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true},
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;




