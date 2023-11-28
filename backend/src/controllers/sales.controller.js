const service = require('../services/sales.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
  const { status, data } = await service.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getByIdSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getByIdSale(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data.message });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const dataList = req.body;
  const { status, data } = await service.createSale(dataList);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getByIdSale,
  createSale,
};
