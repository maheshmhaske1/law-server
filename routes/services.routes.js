const express = require('express');
const router = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
} = require('../controllers/services.controllers');

// Create a new service
router.post('/', createService);

// Get all services
router.get('/', getAllServices);

// Get a specific service by ID
router.get('/:id', getServiceById);

// Update a service by ID
router.patch('/:id', updateServiceById);

// Delete a service by ID
router.delete('/:id', deleteServiceById);

module.exports = router;
