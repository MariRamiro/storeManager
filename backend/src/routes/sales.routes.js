const { Router } = require('express');
const controller = require('../controllers/sales.controller');

const salesRoutes = Router();

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getByIdSale);

module.exports = salesRoutes;