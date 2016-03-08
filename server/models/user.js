/**
 * user.js - Defines the user schema
 *
 * @type {mongoose|exports|module.exports}
 */

var mongoose = require('../db');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, uniqueCaseInsensitive: true},
  password: String
});

// Mongoose unique validator is user for validating unique fields
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;




