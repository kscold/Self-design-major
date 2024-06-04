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
