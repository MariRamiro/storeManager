const { Router } = require('express');
const controller = require('../controllers/products.controller');
const productsCheck = require('../middlewares/products.check.middlewares');

const productsRoutes = Router();

productsRoutes.post('/', productsCheck, controller.createProduct);

productsRoutes.get('/', controller.getAllProducts);

productsRoutes.get('/:id', controller.getByIdProduct);

productsRoutes.put('/:id', productsCheck, controller.updateProduct);

module.exports = productsRoutes;