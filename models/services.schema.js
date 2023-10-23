const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [100, 'Title must be less than 100 characters.'],
  },
  shortDescription: {
    type: String,
    maxLength: [255, 'Short description must be less than 255 characters.'],
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
