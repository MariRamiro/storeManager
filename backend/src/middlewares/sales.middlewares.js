const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const salesQuantityCheck = async (req, res, next) => {
  const { quantity } = req.body;
  const { id, productId } = req.params;
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const product = await productsModel.getById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }

  const sale = await salesModel.getByIdSale(id);
  if (!sale.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const salesCheck = (req, res, next) => {
  const data = req.body;

  if (data.some(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (data.some(({ quantity }) => !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (data.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const salesProductsCheck = async (req, res, next) => {
  const data = req.body;
  const check = data.map(({ productId }) => productsModel.getByIdProduct(productId));
  const result = await Promise.all(check);

  if (result.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  salesQuantityCheck,
  salesCheck,
  salesProductsCheck,
};