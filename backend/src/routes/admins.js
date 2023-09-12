var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admins.controllers');
const userController = require('../controllers/users.controllers');
const ngoController = require('../controllers/ngo.controllers');
const rescuerController = require('../controllers/rescuer.controllers');
const { verifyAdmin, verifyLocalStrategy, verifyRefreshToken } = require('../middlewares/authentication');
const { rescuerFilesByAdmin } = require('../middlewares/fileupload');

/* Module 1: User Profiling */
/* -- Admin Profile -- */
router.post('/signin', adminController.signin);
router.post('/sendPasswordResetEmail', adminController.sendPasswordResetEmail);
router.post('/resetPassword', adminController.resetPassword);
router.get('/me', verifyAdmin, adminController.viewMyProfile);
router.post('/setPassword', verifyAdmin, adminController.setPassword);
router.get('/signout', verifyRefreshToken, adminController.signout)
router.get('/refreshTokenCall',verifyRefreshToken, adminController.refreshTokenCall);

/* -- User Management -- */
router.post('/users', verifyAdmin, userController.addUser);
router.get('/users', verifyAdmin, userController.viewUsers);
router.get('/users/:userId', verifyAdmin, userController.viewSpecificUser);

/* -- Admin Management -- */
router.post('/admins', verifyAdmin, adminController.addAdmin);
router.get('/admins', verifyAdmin, adminController.viewAdmins);
router.get('/admins/:userId', verifyAdmin, adminController.viewSpecificAdmin);

/*Module 6: NGO and Rescuer*/
/* -- Rescuer Requests -- */
router.get('/rescuer_requests', verifyAdmin, rescuerController.viewRescuerRequests);
router.get('/rescuer_requests/:requestId',  verifyAdmin, rescuerController.viewSpecificRescuerRequest);
router.delete('/rescuer_requests/:requestId',  verifyAdmin, rescuerController.rejectRescuerRequest);
router.get('/rescuer_requests/approve/:requestId', verifyAdmin, rescuerController.approveRescuerRequest);

/* -- Rescuer -- */
router.post('/rescuers/:userId', verifyAdmin,
    rescuerFilesByAdmin.fields([{name: "rescuerImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "rescuerApproval"}]),
    rescuerController.addRescuer);
router.get('/rescuers', verifyAdmin, rescuerController.viewRescuers);
router.get('/rescuers/:rescuerId', verifyAdmin, rescuerController.viewSpecificRescuer);
router.delete('/rescuers/:rescuerId', verifyAdmin, rescuerController.deleteRescuer);
router.put('/rescuers/:rescuerId', verifyAdmin, rescuerController.editRescuer);


// /* -- NGO Requests -- */
router.get('/ngo_requests', verifyAdmin, ngoController.viewNGORequests);
router.get('/ngo_requests/:requestId',  verifyAdmin, ngoController.viewSpecificNGORequest);
router.delete('/ngo_requests/:requestId',  verifyAdmin, ngoController.rejectNGORequest);
router.get('/ngo_requests/approve/:requestId', verifyAdmin, ngoController.approveNGORequest);

// /* -- NGO -- */
router.get('/ngos', verifyAdmin, ngoController.viewNGOs);
router.get('/ngos/:ngoId', verifyAdmin, ngoController.viewSpecificNGO);
router.delete('/ngos/:ngoId', verifyAdmin, ngoController.deleteNGO);
router.put('/ngos/:ngoId', verifyAdmin, 
    rescuerFilesByAdmin.fields([{name: "ngoImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "registrationCertificate"}, {name: "annualReport"}, {name: "taxExemption"}]),
    ngoController.editNGO);
router.post('/ngos/:userId', verifyAdmin,
    rescuerFilesByAdmin.fields([{name: "ngoImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "registrationCertificate"}, {name: "annualReport"}, {name: "taxExemption"}]),
    ngoController.addNGO);

/*-- Module 7: NGO Participation & Fund Management -- */
//Approve NGO Participation Request
router.get('/ngo_partcipation_request/approve/:requestId', )
//Reject NGO Participation Request

//View NGO Participation Requests

//View Specific NGO Participation Request

//View NGO Participation Posts

//View Specific NGO Participation Post

//Edit NGO Participation Post

//Delete NGO Participation Post

//Approve NGO Fund Raising Request

//Edit NGO Fund Raising Request

//View NGO Fund Raising Request

//View My Fund Raising Posts

//View Specific Fund Raising Post

//Edit Fund Raising Post

//View Donation History

    
module.exports = router;