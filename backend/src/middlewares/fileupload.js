const util = require("util");
const multer = require("multer");
const fs = require('fs');
const maxSize = 5 * 1024 * 1024;

const createDirIfNotExists = dir =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir, { recursive: true }) : undefined;

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


module.exports = {rescuerFiles, rescuerFilesByAdmin, ngoFiles, ngoFilesByAdmin};