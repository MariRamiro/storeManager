const { Router } = require('express');
const controller = require('../controllers/sales.controller');
const { salesCheck,
  salesQuantityCheck, 
  salesProductsCheck,
  saleCheck,
  saleQuantityValid,
  saleProductValid } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.put(
  '/:saleId/products/:productId/quantity',
  saleQuantityValid,
  saleProductValid, 
  controller.updateSale,
);

salesRoutes.post('/', salesCheck, salesQuantityCheck, salesProductsCheck, controller.insertSale);

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getByIdSale);

salesRoutes.delete('/:id', saleCheck, controller.deleteSale);

module.exports = salesRoutes;