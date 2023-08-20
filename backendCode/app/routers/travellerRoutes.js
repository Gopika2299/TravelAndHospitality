const express = require('express');
const travelerController = require('../controllers/travellerController');

const router = express.Router();

// Public routes
router.post('/register', travelerController.registerUser);
router.post('/login', travelerController.login);
router.post('/verify-otp', travelerController.verifyOTP);

// Protected routes
router.use(travelerController.verifyToken);
router.get('/bookings', travelerController.getTravelerBookings);
router.get('/catalogs', travelerController.getTravelCatalogs);
router.post('/book-trip', travelerController.bookTrip);

module.exports = router;
