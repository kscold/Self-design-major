const http2 = require('https2');
const fs = require('fs');

http2 // http를 http2로 수정해서 사용할 수 있음
    .createServer(
        {
            cert: fs.readFileSync('도메인 인증서 경로'), // 서버를 초기화할 때는 readFileSync를 사용해도 됨
            key: fs.readFileSync('도메인 비밀키 경로'),
            ca: [
                fs.readFileSync('상위 인증서 경로'),
                fs.readFileSync('상위 인증서 경로'),
            ],
        },
        (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h1>hello Node!</h1>');
            res.end('<p>Hello Server!</p>');
        }
    )
    .listen(443, () => {
        console.log('443번 포트에서 서버 대기 중입니다!');
    });
