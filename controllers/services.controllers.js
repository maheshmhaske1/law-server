const multer = require('multer');
const Service = require('../models/services.schema');
const upload = require('../services/imageUploader');
const fs = require('fs');
const {
  createServiceValidator,
  updateServiceValidator,
} = require('../validator/services.validator');
const serviceIconUpload = upload('services').single('icon');

// Create a new service
exports.createService = async (req, res) => {
  serviceIconUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        status: false,
        message: 'Error uploading icon',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    const { error, value } = createServiceValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message,
      });
    }

    const { title, shortDescription, description } = value;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No photo is selected',
      });
    }

    const icon = req.file.path;

    try {
      const service = new Service({
        title,
        shortDescription,
        description,
        icon,
      });

      const savedService = await service.save();

      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        service: savedService,
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

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a specific service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a service by ID
exports.updateServiceById = async (req, res) => {
  const { id: serviceId } = req.params;

  serviceIconUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        status: false,
        message: 'Error uploading icon',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    const { error, value } = updateServiceValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Failed',
        error: err.message,
      });
    }

    const { title, shortDescription, description } = value;

    try {
      const updatedObject = {};

      if (title) updatedObject.title = title;
      if (shortDescription) updatedObject.shortDescription = shortDescription;
      if (description) updatedObject.description = description;
      if (req.file) {
        // adding the file into the update object
        updatedObject.icon = req.file.path;

        // const existingServices = await Service.findById(serviceId);

        // if (existingServices.icon) {
        //   // Deleting the previous icon:
        //   fs.unlinkSync(existingServices.icon);
        // }
      }

      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        updatedObject,
        { new: true }
      );

      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Service updated successfully',
        service: updatedService,
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

// Delete a service by ID
exports.deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      service: deletedService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
