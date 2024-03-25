const http = require('http');
const fs = require('fs').promises; // fs를 기다림

const users = {}; // 유저 데이터 저장용 객체

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
                    'Content-Type': 'application/json; charset=utf-8', // html이 아니라 json형식으로 보내겠다는 뜻임
                });
                return res.end(JSON.stringify(users));
            }

            try {
                const data = await fs.readFile(`.${req.url}`); // req.url에 걸리지 않으면
                return res.end(data);
            } catch (err) {
                // 404 로직
            }
        } else if (req.method == 'POST') {
            if (req.url === '/user') {
                let body = ' ';
                req.on('data', (data) => {
                    // 요청의 body를 stream 형식으로 받음
                    body += data;
                });

                return req.on('end', () => {
                    console.log('POST 본문(Body):', body);
                    const { name } = JSON.parse(body); // JSON를 객체로 바꾸고 비구조화 할당
                    const id = Date.now(); // id는 unique하게 현재 시간으롯 러정
                    users[id] = name; // 객체에 name 데이터를 대입
                    res.writeHead(201, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    });
                    res.end('ok');
                });
            }
        } else if (req.method == 'PUT') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];

                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    });
                    return res.end('ok');
                });
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {
                    'Content-Type': 'text/plain; charset=utf-8',
                });
                return res.end('ok');
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
