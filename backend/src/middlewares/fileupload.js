const util = require("util");
const multer = require("multer");
const fs = require('fs');
const maxSize = 5 * 1024 * 1024;

const createDirIfNotExists = dir =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir, { recursive: true }) : undefined;


/*Rescuers*/

let rescuerFiles = multer({
  limits: {
    fileSize: maxSize
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = __basedir + `/public/uploads/users/${req.user.id}/rescuers/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "." + file.mimetype.split('/')[1]);
    },
  })
})

let rescuerFilesByAdmin = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params.userId);
      let dir = __basedir + `/public/uploads/users/${req.params.userId}/rescuers/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "." + file.mimetype.split('/')[1]);
    },
  })
})


/*Rescuer Files*/

let ngoFiles = multer({
  limits: {
    fileSize: maxSize
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = __basedir + `/public/uploads/users/${req.user.id}/ngos/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "." + file.mimetype.split('/')[1]);
    },
  })
})

let ngoFilesByAdmin = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params.userId);
      let dir = __basedir + `/public/uploads/users/${req.params.userId}/ngos/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "." + file.mimetype.split('/')[1]);
    },
  })
})

/*NGO Participation Files*/
let ngoParticipationFiles = multer({
  limits: {
    fileSize: maxSize
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = __basedir + `/public/uploads/ngos/${req.ngo.id}/participation_posts/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split('/')[1]);
    },
  })
})

let ngoParticipationFilesByAdmin = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params.userId);
      let dir = __basedir + `/public/uploads/ngos/${req.params.ngoId}/participation_posts/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split('/')[1]);
    },
  })
})

/*Fund Raising Files*/
let fundRaisingFiles = multer({
  limits: {
    fileSize: maxSize
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = __basedir + `/public/uploads/ngos/${req.ngo.id}/fund_raising_posts/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split('/')[1]);
    },
  })
})

let fundRaisingFilesByAdmin = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.params.userId);
      let dir = __basedir + `/public/uploads/ngos/${req.params.ngoId}/fund_raising_posts/`;
      createDirIfNotExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split('/')[1]);
    },
  })
})

module.exports = {rescuerFiles, rescuerFilesByAdmin, 
                  ngoFiles, ngoFilesByAdmin,
                  ngoParticipationFiles, ngoParticipationFilesByAdmin,
                  fundRaisingFiles, fundRaisingFilesByAdmin};