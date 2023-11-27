const { Router } = require('express');
const controller = require('../controllers/products.controller');

const productsRoutes = Router();

productsRoutes.get('/', controller.getAllProducts);

productsRoutes.get('/:id', controller.getByIdProduct);

module.exports = productsRoutes;