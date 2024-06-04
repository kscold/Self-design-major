const express = require('express');
const { verifyToken, deprecated } = require('../middlewares');
const {
    createToken,
    tokenTest,
    getMyPosts,
    getPostsByHashtag,
} = require('../controllers/v1');

const router = express.Router();

router.use(deprecated); // 모든 라우터에 전부 적용

router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest);

router.get('/posts/my', verifyToken, getMyPosts);
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;
