const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: '로그인 필요' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'nickname', 'role'],
        });
        if (!user) {
            return res
                .status(403)
                .json({ error: '사용자를 찾을 수 없습니다.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error);
        return res.status(403).json({ error: '로그인 필요' });
    }
};
