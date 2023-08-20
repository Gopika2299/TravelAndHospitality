const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog', // The name of the Catalog model
    required: true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
