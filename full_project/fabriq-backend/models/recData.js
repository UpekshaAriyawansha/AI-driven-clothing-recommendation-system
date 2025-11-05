const mongoose = require('mongoose');

const recSchema = new mongoose.Schema({
  bodyShape: String,
  skinColor: String,
  gender: String,
  ageCategory: String,
  heightCategory: String,
  weightCategory: String,
  occasionType: String,
});

module.exports = mongoose.model('Rec', recSchema);
