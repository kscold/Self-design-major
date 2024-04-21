const express = require('express');
const router = express.Router();
const {
    renderJoin,
    renderMain,
    renderProfile,
} = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

// 라우터에서 공통적으로 쓰는 미들웨어를 선언
router.use((req, res, next) => {
    // 공통적으로 쓸 수 있도록 locals로 선언
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next(); // 다음 미들웨어로 호출
});

// 라우터의 마지막 미들웨어를 컨트롤러 처리함
router.get('/profile', isLoggedIn, renderProfile); // 로그인한 사람만 렌더링할 수 있도록 설정
router.get('/join', isNotLoggedIn, renderJoin); // 로그인 안한 사람만 회원가입할 수 있도록 설정
router.get('/', renderMain);

module.exports = router;
