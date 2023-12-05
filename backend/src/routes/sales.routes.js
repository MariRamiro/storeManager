const { Router } = require('express');
const controller = require('../controllers/sales.controller');
const { salesCheck,
  salesQuantityCheck, 
  salesProductsCheck } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.post('/', salesCheck, salesQuantityCheck, salesProductsCheck, controller.insertSale);

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getByIdSale);

module.exports = salesRoutes;