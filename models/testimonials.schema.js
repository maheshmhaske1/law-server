const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [100, 'Name must be less than 100 characters.'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxLength: [500, 'Testimonial content must be less than 500 characters.'],
  },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
