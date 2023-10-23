const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [
      55,
      'The Course name must be less than or equal to 55 characters',
    ],
    required: [true, 'Course name is required'],
  },
  imageUrl: {
    type: String,
  },
  duration: {
    type: Number,
    // required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 years'],
  },
  shortDescription: {
    type: String,
    // required: [true, 'Short description is required'],
    maxLength: [
      255,
      'Short description must be less than or equal to 255 characters',
    ],
  },
  description: {
    type: String,
    // required: [true, 'Description is required'],
  },
  curriculum: {
    type: String,
    // required: [true, 'Curriculum is required'],
  },
  brochureLink: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Invalid URL format. Please enter a valid URL.',
    },
  },
  contact: {
    type: Number,
    required: [true, 'Contact is required'],
    min: [10, 'Duration must be at least 1 years'],
  },
});

module.exports = mongoose.model('Course', courseSchema);
