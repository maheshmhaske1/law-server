const { config } = require('.');
const mongoose = require('mongoose');

exports.connect = () => {
  mongoose
    .connect("mongodb+srv://soumitrosahaofficial:km6KUPZzPIL7RJNA@testdb.vkexehg.mongodb.net/law_site_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log('DB connected successfully'))
    .catch((err) => {
      console.log(`Error connecting Database.
      Error Message: ${err.message}`);
      process.exit(1);
    });
};
