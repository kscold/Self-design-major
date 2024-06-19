const User = require('../models/user'); // MySQL User 모델
const Chat = require('../schemas/chat');

exports.sendMessage = async (req, res) => {
    const { message, to } = req.body;
    const userId = req.user.id; // req.user에서 유저 ID 사용
    console.log('userId: ', userId);

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res
                .status(404)
                .json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const chatMessage = new Chat({
            from: user.nickname,
            to: to, // 메시지 수신자 닉네임
            message,
        });

        await chatMessage.save();

        // from 사용자와 to 사용자를 하나의 방에 추가
        const room = [user.nickname, to].sort().join('_');

        console.log('Emitting chat:', {
            from: user.nickname,
            to: to,
            message,
            createdAt: chatMessage.createdAt,
        });

        req.io.to(room).emit('chat', {
            from: user.nickname,
            to: to,
            message,
            createdAt: chatMessage.createdAt,
        });

        res.status(200).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '메시지 저장 중 오류가 발생했습니다.' });
    }
};

exports.getMessages = async (req, res) => {
    const nickname = req.params.nickname;
    const myNickname = req.user.nickname; // 현재 사용자의 닉네임

    try {
        const messages = await Chat.find({
            $or: [
                { from: myNickname, to: nickname },
                { from: nickname, to: myNickname },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error('메시지 가져오기 중 오류가 발생했습니다:', error);
        res.status(500).json({
            error: '메시지 가져오기 중 오류가 발생했습니다.',
        });
    }
};
