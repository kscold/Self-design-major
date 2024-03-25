const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, [k, v]) => {
            // 이전값 acc 현재값 [k, v] 쿼리스트링을 key:value 로 구조 분해
            acc[k.trim()] = decodeURIComponent(v); // 한글지원 때문에 decode 사용
            return acc;
        }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // 헤더의 쿠키를 설정함

    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        console.log(query);
        const { name } = qs.parse(query); // 쿼리스트링의 name=이름 에서 이름을 추출함
        const expires = new Date(); // 만료기간 설정을 위해

        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(
                name
            )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
        // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요.`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
