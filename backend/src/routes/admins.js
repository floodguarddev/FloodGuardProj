var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admins.controllers');
const userController = require('../controllers/users.controllers');
const { verifyAdmin, verifyLocalStrategy, verifyRefreshToken } = require('../middlewares/authentication');

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

module.exports = router;