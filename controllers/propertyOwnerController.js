const Catalog = require('../models/Catalog');

exports.createCatalog = async (req, res) => {
  const { title, description, images } = req.body;
  const propertyOwnerId = req.user.userId;
  if (req.user.role == 'propertyOwner') {
    try {
      const newCatalog = new Catalog({
        title,
        description,
        images,
        propertyOwner: propertyOwnerId,
      });
      await newCatalog.save();

      res.status(201).json({ message: 'Catalog created successfully' });
    } catch (error) {
      console.log('error',error)
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

