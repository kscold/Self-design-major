const http = require('http');
const fs = require('fs').promises;

const server = http
    .createServer(async (req, res) => {
        try {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            const data = await fs.readFile('./server.html');
            res.end(data); // end를 이용해 data를 뷰에 띄워줌
        } catch (error) {
            console.log(error);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // 일반 문자열을 알려줄 때에는 plain으로 설정함
        }
    })
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', (error) => {
    console.log(error);
});
