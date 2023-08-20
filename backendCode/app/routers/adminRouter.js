const express = require('express');
const adminController = require('../controllers/adminController');
const travelerController = require('../controllers/travellerController');

const router = express.Router();
// Public routes
router.post('/login', travelerController.login);

// Protected routes for admin
router.use(travelerController.verifyToken);
router.get('/bookings', adminController.getAllBookings);
router.get('/verify-token', adminController.getAllBookings);
router.get('/catalogs', adminController.getAllCatalogs);
router.delete('/delete-booking/:bookingId', adminController.deleteBooking);

module.exports = router;
