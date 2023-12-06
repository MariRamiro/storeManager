const { Router } = require('express');
const controller = require('../controllers/sales.controller');
const { salesCheck,
  salesQuantityCheck, 
  salesProductsCheck,
  saleCheck,
  saleQuantityValid,
  saleProductValid } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.post('/', salesCheck, salesQuantityCheck, salesProductsCheck, controller.insertSale);

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getByIdSale);

salesRoutes.delete('/:id', saleCheck, controller.deleteSale);

salesRoutes.put(
  '/:saleId/products/:productId/quantity', 
  saleQuantityValid,
  saleProductValid, 
  controller.updateSale,
);

module.exports = salesRoutes;