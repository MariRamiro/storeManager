const { Router } = require('express');
const controller = require('../controllers/sales.controller');
const { salesCheck, 
  salesProductsCheck } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.post('/', salesCheck, salesProductsCheck, controller.createSale);

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getByIdSale);

module.exports = salesRoutes;