const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    // user === exUser
    passport.serializeUser((user, done) => {
        done(null, user.id); // user id만 추출
    });

    // 세션의 객체 모양 { 1232345 : 1 } { 세션쿠키: 유저아이디 } 형식으로 메모리에 저장되기 때문에 id만 저장함

    // 들어온 유저 id를 해석 id : 1
    passport.deserializeUser((id, done) => {
        // id만 가지고 유저 정보를 복원
        User.findOne({
            where: { id },
        })
            // 따라서 이때부터 req.user를 사용할 수 있음
            .then((user) => done(null, user)) // req.user, req.session
            .catch((err) => done(err));
    });

    local();
};
