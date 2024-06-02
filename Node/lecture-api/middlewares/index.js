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
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        // 전역 객체인 locals에 decoded 속성에 검증한 결과를 넣음
        res.locals.decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET,
        );
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // 에러 코드를 커스터마이징함
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.',
        });
    }
};
