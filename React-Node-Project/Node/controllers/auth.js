const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { loginId, password, email = null, nickname } = req.body;

    try {
        const exUser = await User.findOne({ where: { loginId } });
        if (exUser) {
            return res
                .status(400)
                .json({ error: '이미 존재하는 아이디입니다.' });
        }

        if (email) {
            const exEmail = await User.findOne({ where: { email } });
            if (exEmail) {
                return res
                    .status(400)
                    .json({ error: '이미 존재하는 이메일입니다.' });
            }
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            loginId,
            password: hash,
            email,
            nickname,
        });

        return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { loginId, password } = req.body;

    try {
        const user = await User.findOne({ where: { loginId } });
        if (!user) {
            return res
                .status(401)
                .json({ error: '존재하지 않는 아이디입니다.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res
                .status(401)
                .json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.json({ token });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.logout = (req, res, next) => {
    req.logout(() => {
        res.json({ message: '로그아웃되었습니다.' });
    });
};
