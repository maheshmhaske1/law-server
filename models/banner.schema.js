const mongoose = require('mongoose');

// Define the banner schema
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      maxLength: [50, 'The title must be less than 50 characters.'],
    },
    subTitle: {
      type: String,
      required: [true, 'Subtitle is required.'],
      maxLength: [255, 'The subtitle must be less than 255 characters.'],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model as default
module.exports = mongoose.model('Banner', bannerSchema);
