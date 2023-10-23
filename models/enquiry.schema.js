const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxLength: [100, 'Full name must be less than 100 characters.'],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          // This regex pattern checks if the input matches a valid email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: true,
      maxLength: [500, 'Message must be less than 500 characters.'],
    },
    status: {
      type: String,
      enum: ['RESOLVED', 'PENDING', 'IN PROCESS'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
