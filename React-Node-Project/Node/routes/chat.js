// const express = require('express');
// const { verifyToken } = require('../middlewares');
// const User = require('../models/user'); // MySQL User 모델
// const MongoUser = require('../schemas/user'); // MongoDB User 모델
// const Chat = require('../schemas/chat');
//
// const router = express.Router();
//
// router.post('/message', verifyToken, async (req, res) => {
//     const { message } = req.body;
//     const userId = req.decoded.id; // 토큰에서 추출한 유저 ID 사용
//     console.log('userId: ', userId);
//
//     try {
//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res
//                 .status(404)
//                 .json({ error: '사용자를 찾을 수 없습니다.' });
//         }
//
//         // MongoDB에서 해당 nickname을 가진 User 찾기
//         const mongoUser = await MongoUser.findOne({ nickname: user.nickname });
//         if (!mongoUser) {
//             return res
//                 .status(404)
//                 .json({ error: 'MongoDB 사용자를 찾을 수 없습니다.' });
//         }
//
//         const chatMessage = new Chat({
//             user: mongoUser._id, // MongoDB에서 찾은 User의 ObjectId 사용
//             message,
//         });
//
//         await chatMessage.save();
//         res.status(200).json(chatMessage);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: '메시지 저장 중 오류가 발생했습니다.' });
//     }
// });
//
// module.exports = router;

const express = require('express');
const { verifyToken } = require('../middlewares');
const User = require('../models/user'); // MySQL User 모델
const MongoUser = require('../schemas/user'); // MongoDB User 모델
const Chat = require('../schemas/chat');

const router = express.Router();

router.post('/message', verifyToken, async (req, res) => {
    console.log('req.io:', req.io);
    const { message } = req.body;
    const userId = req.user.id; // req.user에서 유저 ID 사용
    console.log('userId: ', userId);

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res
                .status(404)
                .json({ error: '사용자를 찾을 수 없습니다.' });
        }

        // MongoDB에서 해당 nickname을 가진 User 찾기
        const mongoUser = await MongoUser.findOne({ nickname: user.nickname });
        if (!mongoUser) {
            return res
                .status(404)
                .json({ error: 'MongoDB 사용자를 찾을 수 없습니다.' });
        }

        const chatMessage = new Chat({
            user: mongoUser._id, // MongoDB에서 찾은 User의 ObjectId 사용
            message,
        });

        await chatMessage.save();

        // Socket.IO로 메시지 전송
        req.io.emit('chat message', {
            user: user.nickname,
            message: message,
            createdAt: chatMessage.createdAt,
        });

        res.status(200).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '메시지 저장 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
