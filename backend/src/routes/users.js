var express = require('express');
const userController = require('../controllers/users.controllers')
var router = express.Router();

/* GET users listing. */
router.post('/signup', userController.signup);

module.exports = router;