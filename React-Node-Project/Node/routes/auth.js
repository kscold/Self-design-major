const express = require('express');
const { isNotLoggedIn, isLoggedIn, verifyToken } = require('../middlewares');
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

// GET /auth/protected
router.get('/protected', verifyToken, (req, res) => {
    // 토큰이 유효한 경우, req.user 객체를 통해 사용자 정보에 접근할 수 있습니다.
    console.log(req.user);
    res.json({ message: '보호된 리소스에 접근했습니다.' });
});

module.exports = router;
