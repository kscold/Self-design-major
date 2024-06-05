const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const {
    uploadPost,
    showPosts,
    afterUploadImages,
    getImage,
} = require('../controllers/codingPost');

try {
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = file.originalname.replace(/\s/g, '_'); // 띄어쓰기를 '_'로 대체
            cb(null, path.basename(fileName, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
    '/uploads',
    verifyToken,
    upload.array('images', 10), // 최대 10개의 파일 업로드 허용
    afterUploadImages,
    uploadPost,
);

router.get('/uploads/:image', (req, res) => {
    const imageName = decodeURIComponent(req.params.image); // 파일 이름 디코딩
    console.log(imageName);
    const imagePath = path.join(__dirname, '../uploads', imageName);
    res.sendFile(imagePath);
});

router.get('/', showPosts);

module.exports = router;
