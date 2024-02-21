// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const config = require('../config/config');


// Register a new user
exports.register = async (req, res) => {
  try {
    const { IDnumber,Fullname, Gender, username, password } = req.body;


   
    const existingUser = await User.findOne({ $or: [{ username }, { password } ] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


   // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


   // Create a new user
    const user = new User({
      IDnumber,
      Fullname,
      Gender,
      username,
      password: hashedPassword,
    });


   // Save the user to the database
    await user.save();


   // Generate an authentication token
    const authToken = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });


   // Update the user with the authentication token
    user.authToken = authToken;
    await user.save();


   // Send an email with the authentication token (implement nodemailer logic here)


   res.status(201).json({ message: 'User registered successfully', authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Verify user registration with authentication token
exports.verifyRegistration = async (req, res) => {
  try {
    const { authToken } = req.body;


   // Decode the authentication token
    const decoded = jwt.verify(authToken, config.secret);


   // Find the user by ID and update the verification status
   await User.findByIdAndUpdate(decoded.userId, { isVerified: true });


   res.status(200).json({ message: 'User registration verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const authToken = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });

    // Return the token and user details
    res.status(200).json({ authToken, user: { id: user._id, username: user.username, Fullname: user.Fullname, Gender: user.Gender } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
