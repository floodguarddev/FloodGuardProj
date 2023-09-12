var express = require('express');
const userController = require('../controllers/users.controllers');
const rescuerController = require('../controllers/rescuer.controllers');
const ngoController = require('../controllers/ngo.controllers');
const { verifyUser, verifyLocalStrategy, verifyRefreshToken } = require('../middlewares/authentication');
const { rescuerFiles, ngoFiles } = require('../middlewares/fileupload');
var router = express.Router();

/* Module 1: User Profiling */
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/sendPasswordResetEmail', userController.sendPasswordResetEmail);
router.post('/resetPassword', userController.resetPassword);
router.get('/sendVerificationEmail', verifyUser, verifyLocalStrategy, userController.sendVerificationEmail);
router.get('/verifyEmail', userController.verifyEmail)
router.get('/me', verifyUser, userController.viewMyProfile);
router.post('/setPassword', verifyUser, verifyLocalStrategy, userController.setPassword);
router.get('/signout', verifyRefreshToken, userController.signout)
router.get('/refreshTokenCall',verifyRefreshToken, userController.refreshTokenCall);

/*Module 6: NGO and Rescuer*/
/*--Rescuer Request--*/
router.post('/rescuer_requests', verifyUser, 
    rescuerFiles.fields([{name: "rescuerImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "rescuerApproval"}]), 
    rescuerController.applyForRescuer);
router.get('/rescuer_requests/me', verifyUser, rescuerController.viewRescuerRequestByUserId);
router.put('/rescuer_requests/me', verifyUser, 
    rescuerFiles.fields([{name: "rescuerImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "rescuerApproval"}]),
    rescuerController.editRescuerRequestByUserId);

/*--Rescuer--*/
router.get('/rescuers/:rescuerId', verifyUser, rescuerController.viewSpecificRescuer);
router.get('/rescuers', verifyUser, rescuerController.viewRescuers);

/*--NGO Request--*/
router.post('/ngo_requests', verifyUser,
    ngoFiles.fields([{name: "ngoImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "registrationCertificate"}, {name: "annualReport"}, {name: "taxExemption"}]),
    ngoController.applyForNGO);
router.get('/ngo_requests/me', verifyUser, ngoController.viewNGORequestByUserId);
router.put('/ngo_requests/me', verifyUser, 
    ngoFiles.fields([{name: "ngoImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "registrationCertificate"}, {name: "annualReport"}, {name: "taxExemption"}]),
    ngoController.editNGORequestByUserId);

/*--NGO--*/
router.get('/ngos/:ngoId', verifyUser, ngoController.viewSpecificNGO);
router.get('/ngos', verifyUser, ngoController.viewNGOs);

/*-- Module 7: NGO Participation & Fund Management -- */

//View Participation Posts

//View Specific Participation Post

//View Fund Raising Posts

//View Specific Fund Raising Post

//Edit Fund Raising Post

//Donate NGO

//Donate on Fund Raising Post

//View Donation History

module.exports = router;