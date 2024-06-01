const express = require('express');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const passport = require('passport');
// const { default: axios } = require('axios');

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
    },
);

module.exports = router;
