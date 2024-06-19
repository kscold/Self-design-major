const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoUser = require('../schemas/user'); // MongoDB User 모델

exports.join = async (req, res, next) => {
    const { loginId, password, email = null, nickname } = req.body;

    try {
        const exUser = await User.findOne({ where: { loginId } });
        if (exUser) {
            return res
                .status(409)
                .json({ error: '이미 존재하는 아이디입니다.' });
        }

        if (email) {
            const exEmail = await User.findOne({ where: { email } });
            if (exEmail) {
                return res
                    .status(409)
                    .json({ error: '이미 존재하는 이메일입니다.' });
            }
        }

        const hash = await bcrypt.hash(password, 12);
        const userCount = await User.count();
        const role = userCount === 0 ? 'admin' : 'user';

        const newUser = await User.create({
            loginId,
            password: hash,
            email,
            nickname,
            role,
        });

        // MongoDB에 사용자 정보 저장
        const mongoUser = new MongoUser({
            nickname,
            role,
        });

        await mongoUser.save();

        return res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }
        next(error);
    }
};

exports.login = async (req, res) => {
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

        return res
            .status(200)
            .json({ nickname: user.nickname, role: user.role, token });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// exports.logout = (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ message: '로그아웃 실패' });
//         }
//         res.status(200).json({ message: '로그아웃 성공' });
//     });
// };

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 실패' });
        }
        req.session.destroy();
        res.status(200).json({ message: '로그아웃 성공' });
    });
};
