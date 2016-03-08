/**
 * exercise.js - Defines the exercise schema
 *
 * @type {mongoose|exports|module.exports}
 */

var mongoose = require('../db');

var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  type: String,
  title: String,
  description: String
});

var Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
