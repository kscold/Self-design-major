const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(cookieParser('zerochpassword'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static({ __dirname: 'public' }));

app.get('/', (req, res, next) => {
    // 쿠키 설정
    // req.cookies; // { mycookie: 'test' }
    // req.signedCookies;

    // res.cookie('name', encodeURIComponent(name), {
    //     expires: new Date(),
    //     httpOnly: true,
    //     path: '/',
    // });

    // res.clearCookie('name', encodeURIComponent(name), {
    //     httpOnly: true,
    //     path: '/',
    // });

    // req.body. 를 통해 객체를 접근할 수 있음

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

// app.get('*', (req, res) => { // 와일드카드
//     res.send('hello everybody');
// });

app.use((req, res, next) => {
    // 현재 위치에 미들웨어를 넣으면 404처리 미들웨어가 됨(에러 미들웨어는 아님)
    res.status(404).send('404지롱'); // res.stauts(200).send()가 기본적으로 생략되어 있는 것이기 때문
});

app.use((err, req, res, next) => {
    // 에러처리 미들웨어
    console.error(err);
    res.send('에러났지롱. 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
