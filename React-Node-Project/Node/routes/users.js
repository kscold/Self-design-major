// routes/users.js
// const express = require('express');
// const Users = require('../models/user');
//
// const router = express.Router();
//
// // GET /api/users
// router.get('/', async (req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes: ['id', 'nickname', 'role'], // role 추가
//         });
//         res.json(users);
//     } catch (error) {
//         console.error('사용자 목록을 가져오는 중 오류 발생:', error);
//         res.status(500).json({ error: '사용자 목록을 가져오는 중 오류 발생' });
//     }
// });
//
// module.exports = router;

const express = require('express');
const { verifyToken } = require('../middlewares');
const Users = require('../models/user');

const router = express.Router();

// Get all users (only for admin)
router.get('/', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: '권한이 없습니다.' });
        }
        const users = await Users.findAll({
            attributes: ['id', 'nickname', 'role'],
        });
        res.json(users);
    } catch (error) {
        console.error('사용자 목록을 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 목록을 가져오는 중 오류 발생' });
    }
});

// Get a specific user
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.userId, {
            attributes: ['id', 'nickname', 'role'],
        });
        if (!user) {
            return res
                .status(404)
                .json({ error: '사용자를 찾을 수 없습니다.' });
        }
        res.json(user);
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 정보를 가져오는 중 오류 발생' });
    }
});

module.exports = router;
