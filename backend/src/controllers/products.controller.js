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

module.exports = {
  getAllProducts,
  getByIdProduct,
};