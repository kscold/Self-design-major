const express = require('express');
const { verifyToken } = require('../middlewares');
const {
    postImage,
    getImage,
    createPostWithSidebar,
    getPostsBySidebar,
    getPostDetailBySidebar,
    updatePostInSidebar,
    deletePostInSidebar,
    createSidebar,
    getSidebar,
    updateSidebar,
    deleteSidebar,
} = require('../controllers/condingPageController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 이미지 업로드 설정
try {
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = file.originalname.replace(/\s/g, '_');
        cb(null, `${path.basename(fileName, ext)}_${Date.now()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
    fileFilter,
});

// 이미지 업로드 API
router.post('/image', upload.array('images', 10), postImage);
router.get('/image/:image', getImage);

router.post('/post', verifyToken, createPostWithSidebar);
router.get('/post/:sidebarId', getPostsBySidebar);
router.get('/post/:sidebarId/:postId', getPostDetailBySidebar);
router.put('/post/:postId', verifyToken, updatePostInSidebar);
router.delete('/post/:postId', verifyToken, deletePostInSidebar);

router.post('/sidebar', verifyToken, createSidebar);
router.get('/sidebar', getSidebar);
router.put('/sidebar/:id', verifyToken, updateSidebar);
router.delete('/sidebar/:id', verifyToken, deleteSidebar);

module.exports = router;
