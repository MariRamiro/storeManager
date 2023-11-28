const service = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { status, data } = await service.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getByIdProduct(id);
  console.log(status);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data.message });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const name = req.body;
  const { status, data } = await service.createProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await service.updateProduct(name, id);
  const { status, data } = await service.getByIdProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
};