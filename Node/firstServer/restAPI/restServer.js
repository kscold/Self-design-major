const http = require('http');
const fs = require('fs').promises; // fs를 기다림

http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET') {
            // 리퀘스트 요청 방법에 대해서 정보를 얻음
            if (req.url === '/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                });
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                });
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(201, {
                    'Content-Type': 'application/json; charset=utf-8',
                });
                return res.end(JSON.stringify(users));
            }

            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                // 404 로직
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
