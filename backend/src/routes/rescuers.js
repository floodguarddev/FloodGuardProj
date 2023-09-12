var express = require('express');
const { verifyUser, verifyRescuer } = require('../middlewares/authentication');
const rescuerController = require('../controllers/rescuer.controllers');
const { rescuerFiles } = require('../middlewares/fileupload');
var router = express.Router();

//As One must be a User Befor Being an Rescuer
router.use(verifyUser);
//As One must be Rescuer to Use Rescuer Handlers
router.use(verifyRescuer);

/* GET rescuers listing. */
router.get('/me', rescuerController.viewMyProfile);
router.delete('/me', rescuerController.deleteMyProfile );
router.put('/me', 
  rescuerFiles.fields([{name: "rescuerImage"}, {name: "frontSideCNIC"}, {name: "backSideCNIC"}, {name: "rescuerApproval"}]),
  rescuerController.editMyProfile);

module.exports = router;