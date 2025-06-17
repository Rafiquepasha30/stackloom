const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  image: String,
  sessionSheet: String,
  labManual: String
});

module.exports = mongoose.model('Course', courseSchema);
