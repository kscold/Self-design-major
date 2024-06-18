const socketIo = require('socket.io');
const User = require('../models/user');

const configureSocket = (server) => {
    const io = socketIo(server, {
        path: '/socket.io',
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

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
        console.log('새로운 클라이언트 연결');

        const userId = socket.request.session.passport.user;
        User.findByPk(userId).then((user) => {
            if (user) {
                socket.join(user.nickname); // 사용자를 닉네임을 사용하여 방에 가입시킴
                console.log(`${user.nickname} 님이 연결되었습니다.`);
            }
        });

        socket.on('disconnect', () => {
            console.log('클라이언트 연결 해제');
        });

        socket.on('leave room', (room) => {
            socket.leave(room);
            console.log(`클라이언트가 ${room} 방을 나갔습니다.`);
        });
    });

    return io;
};

module.exports = configureSocket;
