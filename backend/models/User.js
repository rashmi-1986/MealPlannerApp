
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  IDnumber: { type: String, required: true, unique: true },
 Fullname: { type: String, required: true, unique: false },
 gender: { type: String, enum: ['Male', 'Female', 'Others'] },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authToken: { type: String},
  isVerified: { type: Boolean, default: false },
});


const User = mongoose.model('User', userSchema);


module.exports = User;