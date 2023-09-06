var express = require('express');
const userController = require('../controllers/users.controllers');
const { verifyUser, verifyLocalStrategy, verifyRefreshToken } = require('../middlewares/authentication');
var router = express.Router();

/* Module 1: User Profiling */
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/sendPasswordResetEmail', userController.sendPasswordResetEmail);
router.post('/resetPassword', userController.resetPassword);
router.get('/sendVerificationEmail', verifyUser, verifyLocalStrategy, userController.sendVerificationEmail);
router.get('/verifyEmail', userController.verifyEmail)
router.get('/me', verifyUser, userController.viewMyProfile);
router.get('/setPassword', verifyUser, verifyLocalStrategy, userController.setPassword);
router.get('/signout', verifyRefreshToken, userController.signout)
router.get('/refreshTokenCall',verifyRefreshToken, userController.refreshTokenCall);

/*Module 2: */

module.exports = router;