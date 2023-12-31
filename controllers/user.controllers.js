const User = require('../models/user.schema.js');
const {
  registerUserValidator,
  loginUserValidator,
  socialsProfileValidators,
} = require('../validator/user.validator.js');
const { cookieOptions } = require('../utils/cookieOptions.js');
const { config } = require('../config/index.js');

exports.registration = async (req, res) => {
  try {
    // Validate the Input:
    const { error, value } = registerUserValidator(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message,
      });
    }

    const { name, email, password } = value;
    // Checking whether the user is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({
        success: false,
        message: 'User already registered, please try login',
      });
    }

    // If User is not registered the create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.getJwtToken();
    user.token = token;

    // Save the updated user
    await user.save();

    // Remove the password from the response
    user.password = undefined;

    res.status(200).cookie('token', token, cookieOptions).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error, value } = loginUserValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.details[0].message,
      });
    }

    const { email, password } = value;

    // Finding the user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.send({
        success: false,
        message: 'User not found! Please register',
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
      const token = user.getJwtToken();
      // Refresh the token
      user.token = token;

      // Save the updated user
      await user.save();

      // Remove the password from the response
      user.password = undefined;
      res.cookie('token', token, cookieOptions);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user,
      });
    }

    res.send({
      success: false,
      message: 'Invalid credentials',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      message: 'Successfully logged out',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while logging out',
      error: error.message,
    });
  }
};

exports.checkSession = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: 'You are authenticated!',
        user: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Profile Controllers:
// Update user profile information
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = updateProfileValidator(req.body);

    // Find the user by ID and update their profile information
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get the User Information
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
