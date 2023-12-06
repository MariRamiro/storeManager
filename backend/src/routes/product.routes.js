const { Router } = require('express');
const controller = require('../controllers/products.controller');
const productsCheck = require('../middlewares/products.check.middlewares');

const productsRoutes = Router();

productsRoutes.post('/', productsCheck, controller.insertProduct);

productsRoutes.get('/', controller.getAllProducts);

productsRoutes.get('/:id', controller.getByIdProduct);

productsRoutes.put('/:id', productsCheck, controller.updateProduct);

productsRoutes.delete('/:id', controller.deleteProduct);

productsRoutes.get('/search', controller.getProducts);

module.exports = productsRoutes;