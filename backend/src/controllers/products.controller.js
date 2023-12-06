const service = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { status, data } = await service.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getByIdProduct(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data.message });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await service.insertProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await service.updateProduct(name, id);
  const { status, data } = await service.getByIdProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.deleteProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProducts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await service.getProducts(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};