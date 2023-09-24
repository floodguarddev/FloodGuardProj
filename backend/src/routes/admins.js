var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admins.controllers');
const userController = require('../controllers/users.controllers');
const ngoController = require('../controllers/ngo.controllers');
const rescuerController = require('../controllers/rescuer.controllers');
const { verifyAdmin, verifyRefreshToken } = require('../middlewares/authentication');
const { rescuerFilesByAdmin, ngoParticipationFilesByAdmin, newsFilesByAdmin } = require('../middlewares/fileupload');
const ngoParticipationController = require('../controllers/ngo_ participation.controllers');
const fundRaisingController = require('../controllers/fund_raising.controllers');
const donationController = require('../controllers/donations.controller');
const newsController = require('../controllers/news.controller');
const floodPrecautionController = require('../controllers/flood_precautions.controller')
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

/*-- Module 7: NGO Participation -- */
// 1. Approve NGO Participation Request
router.post('/ngo_partcipation_requests/approve/:requestId', verifyAdmin, ngoParticipationController.approveNGOParticipationRequest)
// 2. Reject NGO Participation Request
router.delete('/ngo_partcipation_requests/reject/:requestId', verifyAdmin, ngoParticipationController.rejectNGOParticipationRequest)
// 3. View NGO Participation Requests
router.get('/ngo_participation_requests', verifyAdmin, ngoParticipationController.viewNGOParticipationRequests);
// 4. View Specific NGO Participation Request
router.get('/ngo_participation_requests/:requestId', verifyAdmin, ngoParticipationController.viewSpecificNGOParticipationRequest);
// 5. View NGO Participations
router.get('/ngo_participation_posts', verifyAdmin, ngoParticipationController.viewNGOParticipationPosts)
// 6. View Specific Participation
router.get('/ngo_participation_posts/:postId', verifyAdmin, ngoParticipationController.viewSpecificNGOParticipationPost)
// 7. Edit Delete NGO Participation Post
router.post('/ngos/:ngoId/ngo_participation_posts/', verifyAdmin, 
    ngoParticipationFilesByAdmin.fields([{name: 'postImages'}]),
    ngoParticipationController.addNGOParticipationPost);
router.put('/ngos/:ngoId/ngo_participation_posts/:postId', verifyAdmin, 
    ngoParticipationFilesByAdmin.fields([{name: 'postImages'}]),
    ngoParticipationController.editNGOParticipationPost)
router.delete('/ngo_participation_posts/:postId', verifyAdmin, ngoParticipationController.deleteNGOParticipationPost)


/*-- Module 7: Fund Raising -- */
// 1. Approve NGO Participation Request
router.post('/fund_raising_requests/approve/:requestId', verifyAdmin, fundRaisingController.approveFundRaisingRequest)
// 2. Reject NGO Participation Request
router.delete('/fund_raising_requests/reject/:requestId', verifyAdmin, fundRaisingController.rejectFundRaisingRequest)
// 3. View NGO Participation Requests
router.get('/fund_raising_requests', verifyAdmin, fundRaisingController.viewFundRaisingRequests);
// 4. View Specific NGO Participation Request
router.get('/fund_raising_requests/:requestId', verifyAdmin, fundRaisingController.viewSpecificFundRaisingRequest);
// 5. View NGO Participations
router.get('/fund_raising_posts', verifyAdmin, fundRaisingController.viewFundRaisingPosts)
// 6. View Specific Participation
router.get('/fund_raising_posts/:postId', verifyAdmin, fundRaisingController.viewSpecificFundRaisingPost)
// 7. Edit Delete NGO Participation Post
router.post('/ngos/:ngoId/fund_raising_posts/', verifyAdmin, 
    ngoParticipationFilesByAdmin.fields([{name: 'postImages'}]),
    fundRaisingController.addFundRaisingPost);
router.put('/ngos/:ngoId/fund_raising_posts/:postId', verifyAdmin, 
    ngoParticipationFilesByAdmin.fields([{name: 'postImages'}]),
    fundRaisingController.editFundRaisingPost)
router.delete('/fund_raising_posts/:postId', verifyAdmin, fundRaisingController.deleteFundRaisingPost)

//View Donation History
router.get('/donations', verifyAdmin, donationController.getDonations)
//View Specific Donation
router.get('/donations/:donationId', verifyAdmin, donationController.getSpecificDonation)
    
//News//
router.get('/news', verifyAdmin, newsController.viewNews)
router.get('/news/:newsId', verifyAdmin, newsController.viewSpecificNews);
router.post('/news', verifyAdmin, newsFilesByAdmin.fields([{name: "newsImage"}]), newsController.addNews);
router.delete('/news/:newsId', verifyAdmin, newsController.deleteNews);
router.put('/news/:newsId', verifyAdmin, newsFilesByAdmin.fields([{name: "newsImage"}]), newsController.editNews);

//Precautions//
router.get('/precautions', verifyAdmin, floodPrecautionController.viewPrecautions)
router.get('/precautions/:precautionId', verifyAdmin, floodPrecautionController.viewSpecificPrecaution);
router.post('/precautions', verifyAdmin, floodPrecautionController.addPrecaution);
router.delete('/precautions/:precautionId', verifyAdmin, floodPrecautionController.deletePrecaution);
router.put('/precautions/:precautionId', verifyAdmin, floodPrecautionController.editPrecaution);

module.exports = router;