const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// multer storage
const storage = multer.diskStorage({
  destination: './public/images/uploads/',
  filename: function(req, file, cb){
    cb(null, `pin_${uuid()}${path.extname(file.originalname).toLowerCase()}`);
  }
});

// multer
const upload = multer({
  storage,
  limits: {fileSize: 1000000},
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    // check exttension
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    const mimetype = allowedTypes.test(file.mimetype);

    if(mimetype && extname){
      return cb(null, true);
    } else {
      cb('Invalid file type!');
    }
  }
}).single('image');

module.exports = upload;
