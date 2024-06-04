const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { User, Domain } = require('../models'); // User 모델 임포트

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

// 회원 정보를 검증하기 위해 미들웨어 확장 패턴을 사용
exports.apiLimiter = async (req, res, next) => {
    let user;
    // if (res.locals.decoded.id) {
    //     const user = await User.findOne({
    //         where: { id: res.locals.decoded.id },
    //     });
    // }

    rateLimit({
        windowMs: 60 * 1000,
        max: user?.type === 'premium' ? 1000 : 10,
        handler(req, res) {
            res.status(this.statusCode).json({
                code: this.statusCode,
                message: '1분에 열 번만 요청할 수 있습니다.',
            });
        },
    })(req, res, next);
};

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전 나왔습니다. 새로운 버전을 사용하세요.',
    });
};

exports.corsWhenDomainMatches = async (req, res, next) => {
    const domain = await Domain.findOne({
        // http를 제거하기 위해서 new URL 객체로 감싸고 .host를 붙임
        where: { host: new URL(req.get('origin')).host },
    });
    if (domain) {
        cors({
            origin: 'http://localhost:4000',
            credentials: true,
        })(req, res, next);
    } else {
        next();
    }
};
