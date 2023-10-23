const Course = require('../models/course.schema');
const {
  courseCreateValidator,
  courseUpdateValidator,
} = require('../validator/course.validator');
const upload = require('../services/imageUploader');
const multer = require('multer');
const courseImageUpload = upload('courses').single('image');

exports.createCourse = async (req, res) => {
  courseImageUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        status: false,
        message: 'Error uploading course',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    const { error, value } = courseCreateValidator(req.body);
    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    try {
      const {
        name,
        duration,
        contact,
        shortDescription,
        description,
        curriculum,
        brochureLink,
      } = value;

      let imageUrl = '';
      if (req.file) {
        imageUrl = req.file.path;
      }

      const course = new Course({
        name,
        duration,
        contact,
        shortDescription,
        description,
        curriculum,
        brochureLink,
        imageUrl,
      });

      const savedCourse = await course.save();

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course: savedCourse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
};

exports.updateCourse = async (req, res) => {
  const { id: courseId } = req.params;

  courseImageUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        status: false,
        message: 'Error uploading course',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    const { error, value } = courseUpdateValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path;
    }

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { ...value, imageUrl },
        {
          new: true,
        }
      );

      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
