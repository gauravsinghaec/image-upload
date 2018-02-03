const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = filetypes.test(file.mimetype);
    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb('Images only');
        return;
    }
}

module.exports = upload;