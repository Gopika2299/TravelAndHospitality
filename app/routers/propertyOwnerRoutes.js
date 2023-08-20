const express = require('express');
const propertyOwnerController = require('../controllers/propertyOwnerController');
const travelerController = require('../controllers/travellerController');
const router = express.Router();

// Public routes
router.post('/register', travelerController.registerUser);
router.post('/login', travelerController.login);
router.post('/verify-otp', travelerController.verifyOTP);

// Protected routes
router.use(travelerController.verifyToken);
router.post('/create-catalog', propertyOwnerController.createCatalog);

module.exports = router;
