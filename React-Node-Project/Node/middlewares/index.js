const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // isAuthenticated는 passport를 통해서 로그인 한 경우를 판단
        next();
    } else {
        // 인증오류가 나면
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // passport를 통해서 로그인 안한 경우를 판단
        next();
    } else {
        res.status(409).send('로그인한 상태입니다.');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({ error: '토큰이 만료되었습니다.' });
        }
        return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    }
};
