const jwt = require('jsonwebtoken');
const {
    getAllUsers,
    getUserById,
    createUser,
    authenticateUser,
} = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: '권한이 없습니다.' });
        }
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('사용자 목록을 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 목록을 가져오는 중 오류 발생' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        res.json(user);
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 정보를 가져오는 중 오류 발생' });
    }
};

exports.join = async (req, res, next) => {
    const { loginId, password, email, nickname } = req.body;

    try {
        await createUser({ loginId, password, email, nickname });
        res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        if (
            error.message === '이미 존재하는 아이디입니다.' ||
            error.message === '이미 존재하는 이메일입니다.'
        ) {
            return res.status(409).json({ error: error.message });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }
        next(error);
    }
};

exports.login = async (req, res) => {
    const { loginId, password } = req.body;
    try {
        const user = await authenticateUser({ loginId, password });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            nickname: user.nickname,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error(error);
        if (
            error.message === '존재하지 않는 아이디입니다.' ||
            error.message === '비밀번호가 일치하지 않습니다.'
        ) {
            return res.status(401).json({ error: error.message });
        }
        next(error);
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 실패' });
        }
        req.session.destroy();
        res.status(200).json({ message: '로그아웃 성공' });
    });
};
