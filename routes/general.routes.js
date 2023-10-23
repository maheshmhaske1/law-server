const express = require('express');
const router = express.Router();

const {
  updateBanner,
  getAllBanner,
  createBanner,
  deleteBanner,
} = require('../controllers/general.controllers');

// Banner Route
router
  .post('/banner', createBanner)
  .get('/banner', getAllBanner)
  .patch('/banner/:id', updateBanner)
  .delete('/banner/:id', deleteBanner);

module.exports = router;
