const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const salesCheck = (req, res, next) => {
  const sales = req.body;
  let messageCheck;

  const check = sales.map((sale) => {
    if (!sale.productId) {
      messageCheck = '"productId" is required';
      return false;
    }
    if (sale.quantity === undefined) {
      messageCheck = '"quantity" is required';
      return false;
    }
    return true;
  });

  if (check.includes(false)) {
    return res.status(400).json({ message: messageCheck });
  }

  next();
};

const salesQuantityCheck = (req, res, next) => {
  const sales = req.body;
  let msgQuantityCheck;

  const check = sales.map((sale) => {
    if (sale.quantity <= 0) {
      msgQuantityCheck = '"quantity" must be greater than or equal to 1';
      return false;
    }

    return true;
  });

  if (check.includes(false)) {
    return res.status(422).json({ message: msgQuantityCheck });
  }

  next();
};

const findProductId = async (sales) => {
  const product = await Promise.all(sales.map((sale) => {
    const productId = productsModel.getByIdProduct(sale.productId);
    return productId;
  }));

  return product;
};

const salesProductsCheck = async (req, res, next) => {
  const sales = req.body;
  const products = await findProductId(sales);
  
  if (products.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const saleCheck = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.findByIdSale(id);

  if (sale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const saleQuantityValid = async (req, res, next) => {
  const { quantity } = req.body;
  console.log('a = b');
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const saleProductValid = async (req, res, next) => {
  const { saleId, productId } = req.params;
  
  const sale = await salesModel.findByIdSale(saleId);
  if (sale === undefined) return res.status(404).json({ message: 'Sale not found' });
  
  const product = await salesModel.updateProductsSale(saleId, productId);
  if (product === undefined) return res.status(404).json({ message: 'Product not found in sale' });

  next();
};

module.exports = {
  salesCheck,
  salesQuantityCheck,
  salesProductsCheck,
  saleCheck,
  saleQuantityValid,
  saleProductValid,
};