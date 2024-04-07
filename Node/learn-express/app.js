const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8080);

// next() 메서드를 이용해서 순차적으로 실행
app.use(
    (req, res, next) => {
        console.log('1 요청에 실행하고 싶어요');
        next();
    },
    (req, res, next) => {
        console.log('2 요청에 실행하고 싶어요');
        next();
    },
    (req, res, next) => {
        console.log('3 요청에 실행하고 싶어요');
        next();
    }
    // (req, res, next) => {
    //     throw new Error('에러가 났어요');
    // }
);

app.get('/', (req, res) => {
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
    console.error(err);
    res.send('에러났지롱. 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
