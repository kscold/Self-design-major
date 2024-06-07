const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'loginId',
                passwordField: 'password',
            },
            async (loginId, password, done) => {
                try {
                    const user = await User.findOne({ where: { loginId } });
                    if (!user) {
                        return done(null, false, {
                            message: '존재하지 않는 아이디입니다.',
                        });
                    }
                    const isMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (!isMatch) {
                        return done(null, false, {
                            message: '비밀번호가 일치하지 않습니다.',
                        });
                    }
                    return done(null, user);
                } catch (err) {
                    done(err);
                }
            },
        ),
    );
};
