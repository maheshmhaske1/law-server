const express = require('express');
const router = express.Router();

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
  deleteTestimonialById,
} = require('../controllers/testimonials.controllers');

// Create a new testimonial
router.post('/', createTestimonial);

// Get all testimonials
router.get('/', getAllTestimonials);

// Get a specific testimonial by ID
router.get('/:id', getTestimonialById);

// Update a testimonial by ID
router.patch('/:id', updateTestimonialById);

// Delete a testimonial by ID
router.delete('/:id', deleteTestimonialById);

module.exports = router;
