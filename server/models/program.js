var mongoose = require('../db');

var Schema = mongoose.Schema;

var programSchema = new Schema({
  legs: String,
  back: String,
  chest: String,
  shoulders: String,
  core: String,
  goal: String,
  sets: String,
  reps: String,
  rest: String
});

var Program = mongoose.model('Program', programSchema);

module.exports = Program;
