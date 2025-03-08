const express = require('express');
const router = express.Router();

const ordersControllers = require('../controllers/ordersControllers');

const auth = require('../middlewares/auth');

router.get('/',auth, ordersControllers.getOrders);

router.post('/',auth, ordersControllers.addOrder);

module.exports = router;
