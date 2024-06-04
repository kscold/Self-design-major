const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');

dotenv.config(); // process.env안에 들어감

const authRouter = require('./routes/auth');
const codingPostRouter = require('./routes/codingPost');
const userRouter = require('./routes/user');

const passportConfig = require('./passport'); // passport를 부름

const app = express();

passportConfig(); // passport를 실행

app.set('port', process.env.PORT || 8080);

// 시퀄라이즈를 실행하는 코드
sequelize
    .sync({ force: true }) // 개발 시에 데이터베이스 초기화
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev')); // 로깅을 개발모드로 설정 배포시에는 combine으로 설정해야함(메모리 이점)
app.use(express.static(path.join(__dirname, 'public'))); // 프론트 연결설정
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // 프론트 연결설정
app.use(express.json()); // req.body를 ajax json 요청을 받을 수 있게 만듬
app.use(express.urlencoded({ extended: false })); // req.body 폼 요청을 받을 수 있게 만듬
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie 키 설정과 쿠키 관련 설정을 할 수 있게 만듬(쿠키가 같이 오는지 확인) { connect.sid : 1231293814312 }
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true, // 자바스크립트에서 접근 못하게 설정(보안성에 좋음)
            secure: false, // https 적용시킬 때 true로 바꿈
        },
    }),
);

// passport 미들웨어는 항상 express 세션 밑에 설정해야함
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout이 생성됨
app.use(passport.session()); // connect.id라는 이름으로 세션 쿠키가 브라우저로 전송
// 브라우저의 connect.sid=1231293814312

app.use('/api/auth', authRouter); // authRouter에 걸리면
app.use('/api/codingPost', codingPostRouter);
app.use('/api/user', userRouter);

// 404 NOT FOUND라면 마주하게 되는 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error); // 다음 미들웨어로 실행
});

// 에러 미들웨어 선언
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

    res.status(err.status || 500);
    res.json({ error: err.message }); // 에러 메시지를 JSON 형식으로 반환
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`);
});
