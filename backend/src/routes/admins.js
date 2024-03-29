var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admins.controllers');
const userController = require('../controllers/users.controllers');
const ngoController = require('../controllers/ngo.controllers');
const rescuerController = require('../controllers/rescuer.controllers');
const { verifyAdmin, verifyRefreshToken } = require('../middlewares/authentication');
const { rescuerFilesByAdmin, ngoParticipationFilesByAdmin, newsFilesByAdmin, profileFiles, profileFilesByAdmin } = require('../middlewares/fileupload');
const ngoParticipationController = require('../controllers/ngo_ participation.controllers');
const fundRaisingController = require('../controllers/fund_raising.controllers');
const donationController = require('../controllers/donations.controller');
const newsController = require('../controllers/news.controller');
const floodPrecautionController = require('../controllers/flood_precautions.controller')
const reportController = require('../controllers/reports.controllers');
const floodController = require('../controllers/floods.controllers');
const cameraController = require('../controllers/cameras.controllers');
const notificationController = require('../controllers/notifications.controller');
const cacheMiddleWare = require('../middlewares/cache');

/** Notifications for Admin*/
// router.get('/notifications', verifyAdmin, notificationController.getAllNotifications);

/* Module 1: User Profiling */
/* -- Admin Profile -- */
router.post('/signin', adminController.signin);
router.post('/sendPasswordResetEmail', adminController.sendPasswordResetEmail);
router.post('/resetPassword', adminController.resetPassword);
router.get('/me', verifyAdmin, adminController.viewMyProfile);
router.put('/me', verifyAdmin, profileFiles.fields([{'name': 'adminPhoto'}]), adminController.updateMyProfile);
router.post('/setPassword', verifyAdmin, adminController.setPassword);
router.get('/signout', verifyRefreshToken, adminController.signout)
router.get('/refreshTokenCall',verifyRefreshToken, adminController.refreshTokenCall);

/* -- User Management -- */
router.post('/users', profileFilesByAdmin.fields([{name: "userPhoto"}]),verifyAdmin, userController.addUser);
router.get('/users', verifyAdmin, userController.viewUsers);
router.get('/users/:userId', verifyAdmin, userController.viewSpecificUser);
router.put('/users/:userId', verifyAdmin, profileFilesByAdmin.fields([{name: "userPhoto"}]), userController.editUser)
router.delete('/users/:userId', verifyAdmin, userController.deleteUser)
/* -- Admin Management -- */
router.post('/admins', verifyAdmin, profileFilesByAdmin.fields([{name: "adminPhoto"}]), adminController.addAdmin);
router.get('/admins', verifyAdmin, adminController.viewAdmins);
router.get('/admins/:userId', verifyAdmin, adminController.viewSpecificAdmin);
router.put('/admins/:userId', verifyAdmin, profileFiles.fields([{'name': 'adminPhoto'}]), adminController.editAdmin);
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
router.delete('/ngo_requests/reject/:requestId',  verifyAdmin, ngoController.rejectNGORequest);
router.post('/ngo_requests/approve/:requestId', verifyAdmin, ngoController.approveNGORequest);

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
router.post('/ngo_participation_requests/approve/:requestId', verifyAdmin, ngoParticipationController.approveNGOParticipationRequest)
// 2. Reject NGO Participation Request
router.delete('/ngo_participation_requests/reject/:requestId', verifyAdmin, ngoParticipationController.rejectNGOParticipationRequest)
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
router.post('/news', verifyAdmin, newsFilesByAdmin.fields([{name: "image"}]), newsController.addNews);
router.delete('/news/:newsId', verifyAdmin, newsController.deleteNews);
router.put('/news/:newsId', verifyAdmin, newsFilesByAdmin.fields([{name: "image"}]), newsController.editNews);

//Precautions//
router.get('/precautions', verifyAdmin, floodPrecautionController.viewPrecautions)
router.get('/precautions/:precautionId', verifyAdmin, floodPrecautionController.viewSpecificPrecaution);
router.post('/precautions', verifyAdmin, floodPrecautionController.addPrecaution);
router.delete('/precautions/:precautionId', verifyAdmin, floodPrecautionController.deletePrecaution);
router.put('/precautions/:precautionId', verifyAdmin, floodPrecautionController.editPrecaution);

//Reports//
router.get('/reports/users', verifyAdmin, cacheMiddleWare.getUsersStatus, reportController.getUsersStatus);
router.get('/reports/donations', verifyAdmin, cacheMiddleWare.getDonationsStatus, reportController.getDonationsStatus);
router.get('/reports/ngos', verifyAdmin, cacheMiddleWare.getNgosStatus, reportController.getNgosStatus);
router.get('/reports/ngosSummary', verifyAdmin, cacheMiddleWare.getNgosSummary, reportController.getNgosSummary);
router.get('/reports/donationsSummary', verifyAdmin, cacheMiddleWare.getDonationsSummary, reportController.getDonationsSummary);
router.get('/reports/usersSummary', verifyAdmin, cacheMiddleWare.getUsersSummary, reportController.getUsersSummary)

//Flood//
router.get('/floods',verifyAdmin, floodController.viewFloods);
router.get('/floods/:floodId',verifyAdmin, floodController.viewSpecificFlood);
router.get('/flood_prediction_heatmap',verifyAdmin, floodController.viewFloodPredictionHeatMap);
router.post('/floods',verifyAdmin, floodController.addFlood);
router.put('/floods/:floodId',verifyAdmin, floodController.editFlood);
router.delete('/floods/:floodId',verifyAdmin, floodController.deleteFlood);

//Cameras//
router.get('/cameras',verifyAdmin, cameraController.viewCameras);
router.post('/cameras',verifyAdmin, cameraController.addCamera);
router.put('/cameras/:cameraId',verifyAdmin, cameraController.editCamera);
router.delete('/cameras/:cameraId',verifyAdmin, cameraController.deleteCamera);


module.exports = router;