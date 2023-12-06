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

const insertProduct = async (productName) => {
  const insertId = await model.insertProduct(productName);
  const product = {
    id: insertId,
    name: productName,
  };
  return { status: 'CREATED', data: product };
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

const getProducts = async (q) => {
  if (!q || q.length === 0) {
    const prod = await model.getAllProducts();
    return { status: 'SUCCESSFUL', data: prod };
  }

  const products = await model.getProducts(q);
  
  if (products.length === 0) {
    return { status: 'SUCCESSFUL', data: [] };
  }
  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};