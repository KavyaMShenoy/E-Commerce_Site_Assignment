const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/usersControllers');

const validateUserMiddlewares = require('../middlewares/validateUserMiddlewares');


router.post('/register', validateUserMiddlewares, userControllers.registerUser);

router.post('/login', userControllers.loginUser);

module.exports = router;