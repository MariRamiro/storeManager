const model = require('../models/products.model');

const nameChecked = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  
  if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const idChecked = async (req, res, next) => {
  const { id } = req.params;

  const product = await model.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = {
  nameChecked,
  idChecked,
};
