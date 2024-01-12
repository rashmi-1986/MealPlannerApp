// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();


// Register a new user
router.post('/register', authController.register);


// Verify user registration with authentication token
router.post('/verify-registration', authController.verifyRegistration);


module.exports = router;