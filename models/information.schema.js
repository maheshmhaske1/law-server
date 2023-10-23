const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [100, 'Name must be less than 100 characters.'],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    // match: [/^https?:\/\/\S+$/, 'Please enter a valid URL for the image.'],
  },
  address: {
    type: String,
    maxLength: [255, 'Address must be less than 255 characters.'],
  },
  phone: {
    type: String,
    match: [
      /^[0-9]{10,15}$/,
      'Phone number must be between 10 to 15 digits long.',
    ],
  },
  email: {
    type: String,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address.',
    ],
  },
  website: {
    type: String,
    match: [/^https?:\/\/\S+$/, 'Please enter a valid URL for the website.'],
  },
});

// Create a model method to ensure there's only one document
infoSchema.statics.getSingleton = async function () {
  let info = await this.findOne();
  if (!info) {
    info = new this();
    await info.save();
  }
  return info;
};

module.exports = mongoose.model('Information', infoSchema);
