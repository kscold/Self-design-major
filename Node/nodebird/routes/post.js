const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { afterUploadImage, uploadPost } = require('../controllers/post');

try {
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/'); // 콜백(error, 경로)
        },
        filename(req, file, cb) {
            console.log(file);
            const ext = path.extname(file.originalname); // file에 originalname이라는 속성이 있음 이미지.png -> 이미지1231231231.png
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 확장자와 분리이후에 날짜를 넣어주고 다시 합침
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 서버에서 로그인 인증에 따른 사용여부를 꼭 막아두어야 함
// 이미지를 올릴 때
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// 게시글을 올릴때는 이미지를 실제로 올리지 않기 때문에 upload2로 분기함
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

// upload.single의 경우 formData.append("img")와 이름이 같아야 함
router.post('/', isLoggedIn, uploadPost);

module.exports = router;
