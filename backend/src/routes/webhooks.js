var express = require('express');
var router = express.Router();
const donationController = require('../controllers/donations.controller');
const bodyParser = require('body-parser');

router.get('/stripe-account-confirmation', donationController.authorizeAccount)

router.post('/stripe-payment', bodyParser.raw({type: 'application/json'}), donationController.stripeCallBack);

module.exports = router;