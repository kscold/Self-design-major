const express = require('express');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const passport = require('passport');
const { default: axios } = require('axios');

const router = express.Router();
// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// /auth/kakao -> 카카오로그인화면 -> /auth/kakao/callback

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get(
    '/kakao/callback',
    // 실패한 경우
    passport.authenticate('kakao', {
        failureRedirect: '/?loginError=카카오로그인 실패',
    }),

    // 성공한 경우
    // 미들웨어 확장 문법(한번 더 req, res를 사용하기 위해)
    (req, res) => {
        // console.log('로컬입니다.', res.locals);

        res.redirect('/');
    }
);

// GET auth/kakao/logout
/* router.get(
    '/kakao/logout',
    passport.authenticate('kakao'),
    async (req, res) => {
        try {
            const ACCESS_TOKEN = req.user.accessToken; // req.user로부터 accessToken을 가져옴
            console.log('ACCESS_TOKEN', ACCESS_TOKEN);
            let logout = await axios({
                method: 'post',
                url: 'https://kapi.kakao.com/v1/user/unlink',
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });

            console.log('logout', logout);
        } catch (error) {
            console.error(error);
            res.json(error);
        }
        // 세션 정리
        req.logout();
        req.session.destroy();

        res.redirect('/');
    }
); */

module.exports = router;
