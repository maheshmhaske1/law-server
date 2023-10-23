const Information = require('../models/information.schema');
const multer = require('multer');
const upload = require('../services/imageUploader');
const {
  informationCreateValidator,
  informationUpdateValidator,
} = require('../validator/general.validator');
const fs = require('fs');
const infoImageUpload = upload('info').single('image');

// Create Information
exports.createInformation = async (req, res) => {
  try {
    const { error, value } = informationCreateValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    const { name, description, address, phone, email } = value;

    const existingInformation = await Information.findOne();

    if (existingInformation) {
      return res.status(400).json({
        success: false,
        message: 'Information already exists. Use update instead.',
      });
    }

    const information = new Information({
      name,
      description,
      address,
      phone,
      email,
    });

    const savedInformation = await information.save();

    res.status(201).json({
      success: true,
      message: 'Information created successfully',
      information: savedInformation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get Information
exports.getInformation = async (req, res) => {
  try {
    const information = await Information.getSingleton();

    res.status(200).json({
      success: true,
      information,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update Information
exports.updateInformation = async (req, res) => {
  try {
    const { error, value } = informationUpdateValidator(req.body);
    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    const information = await Information.getSingleton();

    const updatedInformation = await Information.findByIdAndUpdate(
      information._id,
      value,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Information updated successfully',
      information: updatedInformation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update Information Image with Multer
exports.updateInformationImage = async (req, res) => {
  infoImageUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        success: false,
        message: 'Error uploading Image',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    try {
      const information = await Information.getSingleton();

      if (information.imageUrl) {
        // Now First Delete the previous image from the storage
        // fs.unlinkSync(information.imageUrl);
      }

      const updatedInformation = await Information.findByIdAndUpdate(
        information._id,
        { imageUrl: req.file.path },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Information image updated successfully',
        information: updatedInformation,
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

// Delete Information
exports.deleteInformation = async (req, res) => {
  try {
    const deletedInformation = await Information.getSingleton().deleteOne({});

    if (!deletedInformation) {
      return res.status(404).json({
        success: false,
        message: 'Information not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Information deleted successfully',
      information: deletedInformation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
