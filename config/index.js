require('dotenv').config();

exports.config = {
  // PORT:
  PORT: process.env.PORT,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,

  // MONGODB URL:
  MONGODB_URL: process.env.MONGODB_URL,
};
