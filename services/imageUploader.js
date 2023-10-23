const multer = require('multer');
const path = require('path');

const storage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../uploads/${folderName}`));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });
};

const upload = (folderName) => {
  return multer({ storage: storage(folderName) });
};

module.exports = upload;
