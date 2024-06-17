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
const ServerIO = require('socket.io');
const { Socket } = require('socket.io');

module.exports = (server) => {
  const io = ServerIO(server, { path: '/socket.io' });

  io.on('connection', (socket) => {
    const req = socket.request; // req를 따로 만들어줌
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 새로운 클라이언트의 ip를 가져올 수 있음
    console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);

    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });

    // socket.io에서 메세지 보내기
    socket.on('reply', (data) => {
      console.log(data);
    });

    socket.on('error', (error) => {
      // 에러 시
      console.error(error);
    });
    socket.interval = setInterval(() => {
      // SocketIo에서는 readyState 상태를 체크할 필요가 없음
      // 3초마다 클라이언트로 메시지 전송
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
