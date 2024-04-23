const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } }); // User가 있는지 검사
        if (exUser) {
            return res.redirect('/join?error=exist'); // 존재하기 때문에 에러를 냄
        }

        const hash = await bcrypt.hash(password, 12); // 비밀번호를 보안
        // 비밀번호를 보안해서 저장(INSERT)
        await User.create({
            email,
            nick,
            password: hash,
        });

        return res.redirect('/'); // 302, 리다이렉트
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.login = () => [
    passport.desrializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    }),
];
