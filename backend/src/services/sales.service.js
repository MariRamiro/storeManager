const model = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getByIdSale = async (id) => {
  const sale = await model.getByIdSale(id);
  
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const insertSale = async (data) => {
  const insertId = await model.insertSale(data);
  const newData = {
    id: insertId,
    itemsSold: data.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
  return { status: 'CREATED', data: newData };
};

module.exports = {
  getAllSales,
  getByIdSale,
  insertSale,
};