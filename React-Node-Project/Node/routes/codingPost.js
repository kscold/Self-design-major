const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    createPostWithSidebar,
    getPostsBySidebar,
    updatePostInSidebar,
    deletePostInSidebar,
    getImage,
    getPostDetailBySidebar,
} = require('../controllers/coding/codingPost');
const {
    getSidebar,
    createSidebar,
    updateSidebar,
    deleteSidebar,
} = require('../controllers/coding/codingPostSidbar');

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

// coding 게시글 curd를 하기 위한 sidebar crud
router.get('/sidebar', getSidebar);
router.post('/sidebar', createSidebar);
router.put('/sidebar/:id', updateSidebar);
router.delete('/sidebar/:id', deleteSidebar);

// 이미지 파일을 가져오는 API
router.get('/image/:image', getImage);

// 게시물과 사이드바를 함께 생성하는 API
router.post(
    '/post',
    verifyToken,
    upload.array('images', 10),
    createPostWithSidebar,
);

// 사이드바 ID에 해당하는 게시물 리스트 조회하는 API
router.get('/post/:sidebarId', getPostsBySidebar);

router.get('/post/:sidebarId/:postId', getPostDetailBySidebar);

// 사이드바에 속한 게시물을 수정하는 API
router.put('/post/:postId', updatePostInSidebar);

// 사이드바에 속한 게시물을 삭제하는 API
router.delete('/post/:postId', deletePostInSidebar);

module.exports = router;
