const multer = require('multer');
const path = require('path');

// Define the destination directory for uploaded files.
const destination = path.join(__dirname, 'images'); // Use an absolute path

const uploader = multer({
  dest: destination, // Set the destination for uploaded files
  fileFilter: (req, file, cb) => {
    const supportedImg = /png|jpg/;
    const extension = path.extname(file.originalname);

    if (supportedImg.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Upload only PNG or JPG images'));
    }
  },
  limits: {
    fileSize: 5242880, // 5 MB in bytes
  },
});

module.exports = uploader;
