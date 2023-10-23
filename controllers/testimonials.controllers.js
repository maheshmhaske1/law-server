const Testimonial = require('../models/testimonials.schema');

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    const testimonial = new Testimonial({
      name,
      rating,
      message,
    });

    const savedTestimonial = await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      testimonial: savedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a specific testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a testimonial by ID
exports.updateTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, message } = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, rating, message },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
      testimonial: deletedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
