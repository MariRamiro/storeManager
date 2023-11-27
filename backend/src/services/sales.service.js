const model = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return { status: 200, data: sales };
};

const getByIdSale = async (id) => {
  const sale = await model.getByIdSale(id);
  
  if (sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 200, data: sale };
};

module.exports = {
  getAllSales,
  getByIdSale,
};