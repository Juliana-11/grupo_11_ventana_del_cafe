const multer = require('multer');
const path = require('path');
//config multer
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join('public/img/userAvatars')
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + "_img_" + path.extname(file.originalname)
        callback(null, imageName);
    }
});
var upload = multer({storage: multerDiskStorage});

module.exports = upload; 