var express = require('express');
const { verifyUser, verifyNGO } = require('../middlewares/authentication');
const ngoController = require('../controllers/ngo.controllers');
const ngoParticipationController = require('../controllers/ngo_ participation.controllers');
const fundRaisingController = require('../controllers/fund_raising.controllers');
const donationsController = require('../controllers/donations.controller');
const { ngoFiles, ngoParticipationFiles, fundRaisingFiles } = require('../middlewares/fileupload');
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
router.post('/ngo_participation_requests', 
            ngoParticipationFiles.fields([{name: "postImages"}]),
            ngoParticipationController.postNGOParticipationRequest)
router.put('/ngo_participation_requests/:ngoParticipationRequestId',
            ngoParticipationFiles.fields([{name: "postImages"}]),
            ngoParticipationController.editNGOParticipationRequestByNGO)
router.delete('/ngo_participation_requests/:ngoParticipationRequestId',
            ngoParticipationController.deleteNGOParticipationRequestByNGO)
router.get('/ngo_participation_requests',
            ngoParticipationController.viewMyNGOParticipationRequests)
router.get('/ngo_participation_requests/:ngoParticipationRequestId',
            ngoParticipationController.viewMySpecificNGOParticipationRequest)
router.get('/ngo_participation_posts', ngoParticipationController.viewNGOParticipationPostsByNGO)
router.get('/ngo_participation_posts/:postId', ngoParticipationController.viewSpecificNGOParticipationPostByNGO)
router.put('/ngo_participation_posts/:postId', 
    ngoParticipationFiles.fields([{name: 'postImages'}]),
    ngoParticipationController.editNGOParticipationPostByNGO)
router.delete('/ngo_participation_posts/:postId', ngoParticipationController.deleteNGOParticipationPostByNGO)
/* --- Fund Raising --- */
router.post('/fund_raising_requests', 
            fundRaisingFiles.fields([{name: "postImages"}]),
            fundRaisingController.postFundRaisingRequest)
router.put('/fund_raising_requests/:requestId',
            fundRaisingFiles.fields([{name: "postImages"}]),
            fundRaisingController.editFundRaisingRequestByNGO)
router.delete('/fund_raising_requests/:requestId',
            fundRaisingController.deleteFundRaisingRequestByNGO)
router.get('/fund_raising_requests',
            fundRaisingController.viewMyFundRaisingRequests)
router.get('/fund_raising_requests/:requestId',
            fundRaisingController.viewMySpecificFundRaisingRequest)
router.get('/fund_raising_posts', fundRaisingController.viewFundRaisingPostsByNGO)
router.get('/fund_raising_posts/:postId', fundRaisingController.viewSpecificFundRaisingPostByNGO)
router.put('/fund_raising_posts/:postId', 
    fundRaisingFiles.fields([{name: 'postImages'}]),
    fundRaisingController.editFundRaisingPostByNGO)
router.delete('/fund_raising_posts/:postId', fundRaisingController.deleteFundRaisingPostByNGO)

/*Connect To Stripe*/
router.get('/get_connect_link', donationsController.getConnectLink);

/*Donations*/
router.get('/donations', donationsController.getDonationsByNGO)
module.exports = router;