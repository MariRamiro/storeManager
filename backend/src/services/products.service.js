const model = require('../models/products.model');

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const getByIdProduct = async (id) => {
  const product = await model.getByIdProduct(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (data) => {
  const { insertId } = await model.insertProduct(data);
  return { status: 201, data: { id: insertId } };
};

const updateProduct = async (name, id) => {
  const affectedRows = await model.updateProduct(name, id);
  if (affectedRows === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: affectedRows };
};

const deleteProduct = async (id) => {
  const affectedRows = await model.deleteProduct(id);
  if (affectedRows === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'DELETED', data: affectedRows };
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};