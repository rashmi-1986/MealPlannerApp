
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  IDnumber: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authToken: { type: String },
  isVerified: { type: Boolean, default: false },
});


const User = mongoose.model('User', userSchema);


module.exports = User;