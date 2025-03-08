const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsControllers');
const validateProductMiddleware = require('../middlewares/validateProductMiddlewares');

const auth = require('../middlewares/auth');

router.get('/', auth, productsController.getAllProducts);

router.get('/details/:id', auth, productsController.getProductById)

router.post('/', auth, validateProductMiddleware, productsController.addProduct);

router.put('/:id', auth, validateProductMiddleware, productsController.updateProduct);

router.delete('/:id', auth, productsController.deleteProduct);

module.exports = router;