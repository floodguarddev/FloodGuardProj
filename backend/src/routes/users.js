var express = require('express');
const userController = require('../controllers/users.controllers');
const rescuerController = require('../controllers/rescuer.controllers');
const ngoController = require('../controllers/ngo.controllers');
const fundRaisingController = require('../controllers/fund_raising.controllers');
const ngoParticipationController = require('../controllers/ngo_ participation.controllers');
const donationController = require('../controllers/donations.controller');
const newsController = require('../controllers/news.controller');
const floodPrecautionController = require('../controllers/flood_precautions.controller')
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
router.get('/ngos/:ngoId', ngoController.viewSpecificNGO);
router.get('/ngos', ngoController.viewNGOs);

/*-- Module 7: NGO Participation & Fund Management -- */
router.get('/ngo_participation_posts', ngoParticipationController.viewNGOParticipationPosts);
router.get('/ngo_participation_posts/:postId', ngoParticipationController.viewSpecificNGOParticipationPost);
//View Fund Raising Posts
router.get('/fund_raising_posts', fundRaisingController.viewFundRaisingPosts);
//View Specific Fund Raising Post
router.get('/fund_raising_posts/:postId', fundRaisingController.viewSpecificFundRaisingPost);
//Donate NGO
router.post('/createPaymentIntent', verifyUser, donationController.createPaymentIntent);
//View Donation History
router.get('/donations', verifyUser, donationController.getDonationsByUser);

/*--- Module 5: News & Precautions ----*/
router.get('/news',   newsController.viewNews)
router.get('/news/:newsId',  newsController.viewSpecificNews);

router.get('/precautions', floodPrecautionController.viewPrecautions)
router.get('/precautions/:precautionId', floodPrecautionController.viewSpecificPrecaution);

module.exports = router;