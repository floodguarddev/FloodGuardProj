var express = require('express');
const { verifyUser, verifyNGO } = require('../middlewares/authentication');
const ngoController = require('../controllers/ngo.controllers');
const { ngoFiles } = require('../middlewares/fileupload');
var router = express.Router();

//As One must be a User Befor Being an Rescuer
router.use(verifyUser);
//As One must be Rescuer to Use Rescuer Handlers
router.use(verifyNGO);

/*Module: 6 NGO Profile Routes */
router.get('/me', ngoController.viewMyProfile);
router.delete('/me', ngoController.deleteMyProfile);
router.put('/me', 
  ngoFiles.fields([{name: "ngoImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "registrationCertificate"}, {name: "annualReport"}, {name: "taxExemption"}]),
  ngoController.editMyProfile);

/*-- Module 7: NGO Participation & Fund Management -- */
//Post NGO Participation Request

//Edit NGO Participation Request

//View NGO Participation Request

//View My Participation Posts

//View Specific Participation Post

//Edit Participation Post

//Post NGO Fund Raising Request

//Edit NGO Fund Raising Request

//View NGO Fund Raising Request

//View My Fund Raising Posts

//View Specific Fund Raising Post

//Edit Fund Raising Post

//View Donation History

module.exports = router;