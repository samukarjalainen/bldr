var mongoose = require('../db');

var Schema = mongoose.Schema;

var programSchema = new Schema({
});

var Program = mongoose.model('Program', programSchema);

module.exports = Program;
