const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');
const kako = require('./kakoStrategy');

module.exports = () => {
    // user === exUser
    passport.serializeUser((user, done) => {
        done(null, user.id); // user id만 추출
    });

    /* passport.serializeUser((data, done) => {
        console.log('시리얼라이즈 유저', data); // user는 tokenUser다.
        // 로그인 시, 사용자 데이터를 세션에 저장하는데
        done(null, { id: data.user.id, accessToken: data.accessToken });
    }); */

    // 세션의 객체 모양 { 1232345 : 1 } { 세션쿠키: 유저아이디 } 형식으로 메모리에 저장되기 때문에 id만 저장함

    // 들어온 유저 id를 해석 id : 1
    passport.deserializeUser((id, done) => {
        // id만 가지고 유저 정보를 복원
        User.findOne({ where: { id } })
            .then((user) => done(null, user)) // req.user 따라서 이때부터 req.user를 사용할 수 있음
            .catch((err) => done(err));
    });

    /* passport.deserializeUser((user, done) => {
        // user = { id: data.user.id, accessToken: data.accessToken };
        console.log('디시리얼라이즈 유저', user);
        User.findOne({ where: { id: user.id } })
            .then((result) => {
                // db에서 가져온 유저데이터 결과 result
                const tokenUser = {
                    user: result,
                    accessToken: user.accessToken,
                };
                console.log('디시리얼라이즈에서 찍히는 유저', tokenUser);

                done(null, tokenUser); // req.user 에 저장된다.
            }) // 조회한 정보를 req.user에 저장한다.
            .catch((error) => done(error));
    }); */

    local();
    kako();
};
