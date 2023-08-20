const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  propertyOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the property owner (User)
});

module.exports = mongoose.model('Catalog', catalogSchema);

