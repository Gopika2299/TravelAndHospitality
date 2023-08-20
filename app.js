const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const travelerRoutes = require('./routers/travellerRoutes');
const propertyOwnerRoutes = require('./routers/propertyOwnerRoutes');
const adminRoutes = require('./routers/adminRouter');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel_platform_booking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));
console.log('check')
// API Routes
app.use('/travelers', travelerRoutes);
app.use('/property-owners', propertyOwnerRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
