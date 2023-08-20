const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'traveler', 'propertyOwner'],
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
