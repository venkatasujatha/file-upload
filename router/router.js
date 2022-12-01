const router = require("express").Router();
const server = require("../server");
const FileController = require("../controller/fileController");

const multer = require("multer");
var multer1 = multer();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
      cb(null, "./images");
    },
  
    filename: function (req, file, cb) {
        
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  })
  const uploadFile = multer({ storage: storage,limits: { fileSize: 1000000 }, fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/tiff" ) {
      
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .tiff format allowed!'));
    }
  }});
  router.post('/readFileContent1',uploadFile.single('path'),FileController.readFile);
  module.exports = router;