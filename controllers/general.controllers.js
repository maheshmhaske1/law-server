const Banner = require('../models/banner.schema');
const upload = require('../services/imageUploader');
const multer = require('multer');
const {
  createBannerValidator,
  updateBannerValidator,
} = require('../validator/general.validator');
const bannerUpload = upload('banner').single('banner');
const fs = require('fs');

exports.createBanner = async (req, res) => {
  bannerUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        success: false,
        message: 'Error uploading file',
        error: err.message,
      });
    } else if (err) {
      return res.send({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }

    const { error, value } = createBannerValidator(req.body);

    if (error) {
      return res.send({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No photo is selected',
      });
    }

    const imageUrl = req.file.path;

    try {
      const newBanner = new Banner({
        title: value.title,
        subTitle: value.subtitle,
        imageUrl,
      });

      const savedBanner = await newBanner.save();

      res.status(201).json({
        success: true,
        message: 'Banner created successfully',
        banner: savedBanner,
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

exports.updateBanner = async (req, res) => {
  const { id: bannerId } = req.params;

  bannerUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({
        success: false,
        message: 'Error uploading file',
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
      const { error, value } = updateBannerValidator(req.body);

      if (error) {
        return res.send({
          success: false,
          message: 'Validation Error',
          error: error.details[0].message,
        });
      }

      let updateData = { title: value.title, subTitle: value.subtitle };

      if (req.file) {
        // Check if the banner has an existing image
        const existingBanner = await Banner.findById(bannerId);

        if (existingBanner.imageUrl) {
          // Delete the previous image from the file system
          fs.unlinkSync(existingBanner.imageUrl);
        }

        // Include the new image path in the update data
        updateData.imageUrl = req.file.path;
      }

      const updatedBanner = await Banner.findByIdAndUpdate(
        bannerId,
        updateData,
        { new: true }
      );

      if (!updatedBanner) {
        return res.status(404).json({
          success: false,
          message: 'Banner not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Banner updated successfully',
        banner: updatedBanner,
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

exports.getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.find();

    if (!banners || banners.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No banners found in the database',
      });
    }

    res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteBanner = async (req, res) => {
  const { id: bannerId } = req.params;

  try {
    const bannerToDelete = await Banner.findById(bannerId);

    if (!bannerToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }

    // // Check if the banner has an existing image
    // if (bannerToDelete.imageUrl) {
    //   // Delete the existing image from the file system
    //   fs.unlinkSync(bannerToDelete.imageUrl);
    // }

    const deletedBanner = await Banner.findByIdAndDelete(bannerId);

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
      banner: deletedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
