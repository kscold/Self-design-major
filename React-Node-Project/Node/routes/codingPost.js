// const express = require('express');
// const router = express.Router();
// const { verifyToken } = require('../middlewares');
// const fs = require('fs');
// const multer = require('multer');
// const path = require('path');
// const {
//     uploadPost,
//     showPosts,
//     afterUploadImages,
//     getImage,
// } = require('../controllers/coding/coding');
// const {
//     getSidebarData,
//     createSidebar,
//     updateSidebar,
//     deleteSidebar,
// } = require('../controllers/coding/codingPostSidbar');
//
// try {
//     fs.readdirSync('uploads');
// } catch (error) {
//     fs.mkdirSync('uploads');
// }
//
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename(req, file, cb) {
//             const ext = path.extname(file.originalname);
//             const fileName = file.originalname.replace(/\s/g, '_'); // 띄어쓰기를 '_'로 대체
//             cb(null, path.basename(fileName, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });
//
// router.post(
//     '/uploads',
//     verifyToken,
//     upload.array('images', 10), // 최대 10개의 파일 업로드 허용
//     afterUploadImages,
//     uploadPost,
// );
//
// router.get('/uploads/:image', (req, res) => {
//     const imageName = decodeURIComponent(req.params.image); // 파일 이름 디코딩
//     console.log(imageName);
//     const imagePath = path.join(__dirname, '../uploads', imageName);
//     res.sendFile(imagePath);
// });
//
// router.get('/', showPosts);
// router.get('/sidebar', getSidebarData);
// router.post('/sidebar', createSidebar);
// router.put('/sidebar/:id', updateSidebar);
// router.delete('/sidebar/:id', deleteSidebar);
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const {
    createPostWithSidebar,
    getPostsBySidebar,
    updatePostInSidebar,
    deletePostInSidebar,
    getImage,
} = require('../controllers/coding/codingPost');
const {
    createSidebar,
    updateSidebar,
    deleteSidebar,
    getSidebar,
} = require('../controllers/coding/codingPostSidbar');

// coding 게시글 curd를 하기 위한 sidebar crud
router.get('/sidebar', getSidebar);
router.post('/sidebar', createSidebar);
router.put('/sidebar/:id', updateSidebar);
router.delete('/sidebar/:id', deleteSidebar);

// upload 파일 설정

// try {
//     fs.readdirSync('uploads');
// } catch (error) {
//     fs.mkdirSync('uploads');
// }
//
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename(req, file, cb) {
//             const ext = path.extname(file.originalname);
//             const fileName = file.originalname.replace(/\s/g, '_');
//             cb(null, path.basename(fileName, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });
//
// router.post(
//     '/post',
//     verifyToken,
//     upload.array('images', 10),
//     createPostWithSidebar,
// );
// router.get('/post/:sidebarId', getPostsBySidebar);
// router.put('/post/:postId', updatePostInSidebar);
// router.delete('/post/:postId', deletePostInSidebar);
//
// // post한 이미지를 조회할 수 있는 api
// router.get('/uploads/:image', (req, res) => {
//     const imageName = decodeURIComponent(req.params.image);
//     const imagePath = path.join(__dirname, '../uploads', imageName);
//     res.sendFile(imagePath);
// });

// 이미지 파일을 가져오는 API
router.get('/uploads/:image', getImage);

// 게시물과 사이드바를 함께 생성하는 API
router.post('/post', verifyToken, createPostWithSidebar);

// 사이드바 ID에 해당하는 게시물을 조회하는 API
router.get('/post/:sidebarId', getPostsBySidebar);

// 사이드바에 속한 게시물을 수정하는 API
router.put('/post/:postId', updatePostInSidebar);

// 사이드바에 속한 게시물을 삭제하는 API
router.delete('/post/:postId', deletePostInSidebar);

module.exports = router;
