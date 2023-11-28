const model = require('../models/products.model');

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return { status: 200, data: products };
};

const getByIdProduct = async (id) => {
  const product = await model.getByIdProduct(id);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: product };
};

const createProduct = async (data) => {
  const { insertId } = await model.createProduct(data);
  return { status: 201, data: { id: insertId } };
};

const updateProduct = async (name, id) => {
  const affectedRows = await model.updateProduct(name, id);
  if (affectedRows === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: affectedRows };
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
};