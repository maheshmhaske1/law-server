const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiry.controllers');

// Route for creating a new enquiry
router.post('/', createEnquiry);

// Route for getting all enquiries
router.get('/', getEnquiries);

// Route for getting a specific enquiry by ID
router.get('/:id', getEnquiryById);

// Route for updating an existing enquiry
router.patch('/:id', updateEnquiry);

// Route for deleting an enquiry
router.delete('/:id', deleteEnquiry);

module.exports = router;
