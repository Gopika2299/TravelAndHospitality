const Booking = require('../models/booking');
const Catalog = require('../models/Catalog');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('traveler').populate('catalog');
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getAllCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.find().populate('propertyOwner');
    res.json({ catalogs });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


