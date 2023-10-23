const express = require('express');
const {
  registration,
  login,
  logOut,
  checkSession,
  forgotPassword,
  updateProfile,
  addSocials,
  updatePassword,
  getUserInfo,
} = require('../controllers/user.controllers.js');
const { isLoggedIn } = require('../middleware/auth.middleware.js');

const router = express.Router();

// Routers
// Authentication:
router
  .post('/auth/registration', registration)
  .post('/auth/login', login)
  .get('/auth/logout', logOut)
  .get('/auth/session', isLoggedIn, checkSession);

module.exports = router;
