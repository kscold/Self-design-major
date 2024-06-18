const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

// 서비스는 req, res에 대해서 몰라야 함
exports.removeRoom = async (roomId) => {
    try {
        await Room.deleteOne({ _id: roomId });
        await Chat.deleteMany({ room: roomId });
    } catch (error) {
        throw error;
    }
};
