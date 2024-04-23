const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email', // req.body.email
                passwordField: 'password', // req.body.password
                passReqToCallback: false, // requset가 지금은 필요 없기 떄문에 falseㄹ 설정
            },
            async (email, password, done) => {
                // done(서버 실패, 성공 유저, 로직 실패)
                try {
                    const exUser = await User.findOne({ where: { email } });
                    if (exUser) {
                        // 사용자가 저장한 비빌번호와 db의 비빌번호가 일치하는지 확인
                        const result = await bcrypt.compare(
                            password,
                            exUser.password
                        ); // 보안하고 비교까지 해줌

                        // 만약 결과값이 반환되면
                        if (result) {
                            done(null, exUser); // req.login 호출
                        } else {
                            done(null, false, {
                                // 로직적으로 실패한 이유를 적어줌
                                message: '비밀번호가 일치하지 않습니다.',
                            });
                        }
                    } else {
                        done(null, false, {
                            message: '가입되지 않은 회원입니다.',
                        });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
};
