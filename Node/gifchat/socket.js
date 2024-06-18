// ws 모듈 사용
// const WebSocket = require('ws');
//
// module.exports = (server) => {
//   const wss = new WebSocket.Server({ server });
//
//   wss.on('connection', (ws, req) => {
//     // 웹소켓 연결 시
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 새로운 클라이언트의 ip를 가져올 수 있음
//     console.log('새로운 클라이언트 접속', ip);
//     ws.on('message', (message) => {
//       // 클라이언트로부터 메시지
//       console.log(message.toString());
//     });
//     ws.on('error', (error) => {
//       // 에러 시
//       console.error(error);
//     });
//     ws.on('close', () => {
//       // 연결 종료 시
//       console.log('클라이언트 접속 해제', ip);
//       clearInterval(ws.interval);
//     });
//
//     ws.interval = setInterval(() => {
//       // readyState 상태가 ws.OPEN일 때만
//       // 3초마다 클라이언트로 메시지 전송
//       if (ws.readyState === ws.OPEN) {
//         ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
//       }
//     }, 3000);
//   });
// };

// socket.io 사용
// Socket.io에서는 send -> onmessage로 보내는 것이 아니라 emit("키",:"값")을 이용하여 on('키', '값') 형태로 메세지를 보냄
// const ServerIO = require('socket.io');
//
// module.exports = (server) => {
//     const io = ServerIO(server, { path: '/socket.io' });
//
//     io.on('connection', (socket) => {
//         const req = socket.request; // req를 따로 만들어줌
//         const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 새로운 클라이언트의 ip를 가져올 수 있음
//         console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);
//
//         socket.on('disconnect', () => {
//             // 연결 종료 시
//             console.log('클라이언트 접속 해제', ip, socket.id);
//             clearInterval(socket.interval);
//         });
//
//         // socket.io에서 메세지 보내기
//         socket.on('reply', (data) => {
//             console.log(data);
//         });
//
//         socket.on('error', (error) => {
//             // 에러 시
//             console.error(error);
//         });
//         socket.interval = setInterval(() => {
//             // SocketIo에서는 readyState 상태를 체크할 필요가 없음
//             // 3초마다 클라이언트로 메시지 전송
//             socket.emit('news', 'Hello Socket.IO');
//         }, 3000);
//     });
// };

// const ServerIO = require('socket.io');
// const { raw } = require('express');
// const { removeRoom } = require('./services');
//
// module.exports = (server, app) => {
//     const io = ServerIO(server, { path: '/socket.io' });
//     app.set('io', io);
//     const room = io.of('/room');
//     const chat = io.of('/chat');
//
//     // socket.io와 express의 req 모양이 다르므로 express req를 사용하기 위한 방법 HOC를 사용
//     const wrap = (middleware) => (socket, next) =>
//         middleware(socket.request, {}, next);
//     chat.use(wrap(sessionMiddleware));
//
//     room.on('connection', (socket) => {
//         console.log('chat 네스임스페이스 접속');
//         socket.on('disconnect', () => {
//             console.log('chat 네스임스페이스 접속 해제');
//         });
//     });
//     chat.on('connection', (socket) => {
//         console.log('chat 네스임스페이스 접속');
//
//         socket.on('join', (data) => {
//             socket.join(data); // 방에 참가
//             socket.to(data).emit('join', {
//                 user: 'system',
//                 chat: `${socket.request.session.color}님이 입장하셨습니다.`,
//             });
//         });
//
//         socket.on('disconnect', async () => {
//             console.log('chat 네스임스페이스 접속 해제');
//             // /room/방아이디
//             const { referer } = socket.request.headers;
//             const roomId = new URL(referer).pathname.split('/').at(-1);
//             const currentRoom = chat.adapter.rooms.get(roomId);
//             const userCount = currentRoom?.size || 0;
//             if (userCount === 0) {
//                 await removeRoom(roomId);
//                 room.emit('removeRoom', roomId);
//                 console.log('방 제거 요청 성공');
//             } else {
//                 socket.to(roomId).emit('exit', {
//                     user: 'system',
//                     chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
//                 });
//             }
//             socket.to(roomId).emit('exit', {
//                 user: 'system',
//                 chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
//             });
//         });
//     });
// };

const ServerIO = require('socket.io');
const { removeRoom } = require('./services');

module.exports = (server, app, sessionMiddleware) => {
    const io = ServerIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    // socket.io와 express의 req 모양이 다르므로 express req를 사용하기 위한 방법 HOC를 사용
    const wrap = (middleware) => (socket, next) =>
        middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware));

    room.on('connection', (socket) => {
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스 접속');

        socket.on('join', (data) => {
            socket.join(data); // 방에 참가
            socket.to(data).emit('join', {
                user: 'system',
                chat: `${socket.request.session.color}님이 입장하셨습니다.`,
            });
        });

        socket.on('disconnect', async () => {
            console.log('chat 네임스페이스 접속 해제');
            const { referer } = socket.request.headers;
            if (referer) {
                const roomId = new URL(referer).pathname.split('/').at(-1);
                const currentRoom = chat.adapter.rooms.get(roomId);
                const userCount = currentRoom?.size || 0;
                if (userCount === 0) {
                    await removeRoom(roomId);
                    room.emit('removeRoom', roomId);
                    console.log('방 제거 요청 성공');
                } else {
                    socket.to(roomId).emit('exit', {
                        user: 'system',
                        chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
                    });
                }
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
    });
};
