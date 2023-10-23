const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [55, 'The title must be less than or equal to 55 characters'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

// Static method to ensure there's only one document
aboutSchema.statics.getSingleton = async function () {
  let about = await this.findOne();
  if (!about) {
    about = new this();
    await about.save();
  }

  return about;
};

module.exports = mongoose.model('About', aboutSchema);
