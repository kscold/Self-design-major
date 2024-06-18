// // socket/index.js
// const Chat = require('../schemas/chat');
// const User = require('../models/user');
//
// module.exports = (io) => {
//     io.use((socket, next) => {
//         if (
//             socket.request.session &&
//             socket.request.session.passport &&
//             socket.request.session.passport.user
//         ) {
//             next();
//         } else {
//             next(new Error('Unauthorized'));
//         }
//     });
//
//     io.on('connection', (socket) => {
//         console.log('새로운 유저가 연결되었습니다.');
//
//         socket.on('disconnect', () => {
//             console.log('유저가 연결이 해제되었습니다.');
//         });
//
//         socket.on('chat message', async (msg) => {
//             const userId = socket.request.session.passport.user;
//             if (!userId) {
//                 console.error('유효하지 않은 사용자 ID입니다.');
//                 return;
//             }
//
//             const user = await User.findByPk(userId);
//             if (!user) {
//                 console.error('사용자를 찾을 수 없습니다.');
//                 return;
//             }
//
//             const chat = new Chat({
//                 user: user._id, // MongoDB에서 ObjectId로 사용
//                 message: msg.message,
//             });
//             await chat.save();
//
//             // 관리자 소켓을 찾고 메시지를 보냄
//             const adminSockets = Array.from(io.sockets.sockets.values()).filter(
//                 (s) => s.request.session?.role === 'admin',
//             );
//
//             adminSockets.forEach((adminSocket) => {
//                 adminSocket.emit('chat message', {
//                     user: user.nickname,
//                     message: msg.message,
//                     createdAt: chat.createdAt,
//                 });
//             });
//
//             socket.emit('chat message', {
//                 user: user.nickname,
//                 message: msg.message,
//                 createdAt: chat.createdAt,
//             });
//         });
//     });
// };

const Chat = require('../schemas/chat');
const User = require('../models/user');

module.exports = (io) => {
    io.use((socket, next) => {
        if (
            socket.request.session &&
            socket.request.session.passport &&
            socket.request.session.passport.user
        ) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    });

    io.on('connection', (socket) => {
        console.log('새로운 유저가 연결되었습니다.');

        socket.on('disconnect', () => {
            console.log('유저가 연결이 해제되었습니다.');
        });

        socket.on('chat message', async (msg) => {
            const userId = socket.request.session.passport.user;
            if (!userId) {
                console.error('유효하지 않은 사용자 ID입니다.');
                return;
            }

            const user = await User.findByPk(userId);
            if (!user) {
                console.error('사용자를 찾을 수 없습니다.');
                return;
            }

            const chat = new Chat({
                user: user._id, // MongoDB에서 ObjectId로 사용
                message: msg.message,
            });
            await chat.save();

            // 관리자 소켓을 찾고 메시지를 보냄
            const adminSockets = Array.from(io.sockets.sockets.values()).filter(
                (s) =>
                    s.request.session?.passport?.user &&
                    s.request.session.passport.user.role === 'admin',
            );

            adminSockets.forEach((adminSocket) => {
                adminSocket.emit('chat message', {
                    user: user.nickname,
                    message: msg.message,
                    createdAt: chat.createdAt,
                });
            });

            socket.emit('chat message', {
                user: user.nickname,
                message: msg.message,
                createdAt: chat.createdAt,
            });
        });
    });
};
