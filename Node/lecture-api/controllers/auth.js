const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;

    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.login = (req, res, next) => {
    // done에 들어있던 3개의 파라미터(서버 실패, 유저 성공, 로직 실패)가 그대로 할당됨
    passport.authenticate('local', (authError, user, info) => {
        // 서버 실패
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        // 로직 실패
        if (!user) {
            // 유저 인증에 실패하면
            return res.redirect(`/?loginError=${info.message}}`);
        }

        // 로그인 성공
        return req.login(user, (loginError) => {
            // 혹시 로그인 과정에도 에러가 날 수 있으니 예외처리를 함
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 확장 패턴
};

// 세션 쿠키를 없애버림
exports.logout = (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
};
