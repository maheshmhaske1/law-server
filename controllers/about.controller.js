const About = require('../models/about.schema');

// Create a new about entry
exports.createAbout = async (req, res) => {
  try {
    const existingAbout = await About.findOne();

    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: 'About already exists. Use update instead.',
      });
    }

    const { title, description } = req.body;

    const about = new About({
      title,
      description,
    });

    const savedAbout = await about.save();

    res.status(200).json({
      success: true,
      message: 'About entry created successfully',
      about: savedAbout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const about = await About.getSingleton();

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a specific about entry by ID
exports.updateAbout = async (req, res) => {
  try {
    const existingAbout = await About.getSingleton();
    if (!existingAbout) {
      return res.send({
        status: false,
        message: 'There is no about, Please create new About',
      });
    }
    const { title, description } = req.body;

    const updatedAboutEntry = await About.findByIdAndUpdate(
      existingAbout._id,
      { title, description },
      { new: true }
    );

    if (!updatedAboutEntry) {
      return res.status(404).json({
        success: false,
        message: 'About entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About entry updated successfully',
      aboutEntry: updatedAboutEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a specific about entry by ID
exports.deleteAbout = async (req, res) => {
  try {
    const existingAbout = await About.getSingleton();
    if (!existingAbout) {
      return res.send({
        success: false,
        message: 'There is no about, Please create new About',
      });
    }
    const deletedAboutEntry = await About.findByIdAndDelete(existingAbout._id);

    if (!deletedAboutEntry) {
      return res.status(404).json({
        success: false,
        message: 'About entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About entry deleted successfully',
      aboutEntry: deletedAboutEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
