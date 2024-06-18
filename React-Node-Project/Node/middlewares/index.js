// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Sequelize 모델
//
// exports.isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         // isAuthenticated는 passport를 통해서 로그인 한 경우를 판단
//         next();
//     } else {
//         // 인증오류가 나면
//         res.status(403).send('로그인 필요');
//     }
// };
//
// exports.isNotLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         // passport를 통해서 로그인 안한 경우를 판단
//         next();
//     } else {
//         res.status(409).send('로그인한 상태입니다.');
//     }
// };
//
// // exports.verifyToken = (req, res, next) => {
// //     try {
// //         const token = req.headers.authorization.split(' ')[1];
// //         req.user = jwt.verify(token, process.env.JWT_SECRET);
// //         next();
// //     } catch (error) {
// //         if (error.name === 'TokenExpiredError') {
// //             return res.status(419).json({ error: '토큰이 만료되었습니다.' });
// //         }
// //         return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
// //     }
// // };
//
// const verifyToken = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//
//     if (!token) {
//         return res.status(403).json({ error: '로그인 필요' });
//     }
//
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findByPk(decoded.id, {
//             attributes: ['id', 'nickname', 'role'],
//         });
//         if (!user) {
//             return res
//                 .status(403)
//                 .json({ error: '사용자를 찾을 수 없습니다.' });
//         }
//         req.user = user; // user 정보를 req.user에 설정
//         next();
//     } catch (error) {
//         console.error('토큰 검증 중 오류 발생:', error);
//         return res.status(403).json({ error: '로그인 필요' });
//     }
// };
//
// module.exports = { verifyToken };

const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ error: '로그인 필요' });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

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
