const Enquiry = require('../models/enquiry.schema');
const {
  createEnquiryValidator,
  updateEnquiryStatusValidation,
} = require('../validator/enquiry.validator');

exports.createEnquiry = async (req, res) => {
  try {
    const { error, value } = createEnquiryValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message,
      });
    }

    const { fullName, email, phone, message } = value;

    const enquiry = new Enquiry({
      fullName,
      email,
      phone,
      message,
    });

    const savedEnquiry = await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry created successfully',
      enquiry: savedEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();

    if (!enquiries || enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No enquiries found in the database',
      });
    }

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.getEnquiryById = async (req, res) => {
  const { id: enquiryId } = req.params;

  try {
    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.updateEnquiry = async (req, res) => {
  const { id: enquiryId } = req.params;

  try {
    const { error, value } = updateEnquiryStatusValidation(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    const { status } = value;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(enquiryId, status, {
      new: true,
    });

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteEnquiry = async (req, res) => {
  const { id: enquiryId } = req.params;

  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
      enquiry: deletedEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
