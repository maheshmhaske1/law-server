const express = require('express');
const router = express.Router();
const {
  getInformation,
  updateInformation,
  createInformation,
  deleteInformation,
  updateInformationImage,
} = require('../controllers/information.controllers');

// Route
router
  .post('/', createInformation)
  .get('/', getInformation)
  .patch('/', updateInformation)
  .delete('/', deleteInformation)
  .patch('/image', updateInformationImage);

module.exports = router;
