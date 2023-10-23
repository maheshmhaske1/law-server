const express = require('express');
const router = express.Router();

const {
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
  getAllCourses,
} = require('../controllers/course.controller');

// Create a new course
router.post('/', createCourse);

// Get all courses
router.get('/', getAllCourses);

// Update a course
router.patch('/:id', updateCourse);

// Get a specific course
router.get('/:id', getCourse);

// Delete a course
router.delete('/:id', deleteCourse);

module.exports = router;
