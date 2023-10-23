const express = require('express');
const router = express.Router();

const {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} = require('../controllers/about.controller');

// Create a new about entry
router.post('/', createAbout);

// Get all about entries
router.get('/', getAbout);

// Update a specific about entry by ID
router.patch('/', updateAbout);

// Delete a specific about entry by ID
router.delete('/', deleteAbout);

module.exports = router;
