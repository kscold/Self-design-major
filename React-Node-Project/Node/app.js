const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
const cors = require('cors'); // cors 모듈 추가

dotenv.config();

const authRouter = require('./routes/auth');
const codingPostRouter = require('./routes/codingPost');

const passportConfig = require('./passport');

const app = express();

passportConfig();

app.set('port', process.env.PORT || 8080);

sequelize
    .sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// CORS 설정 추가
app.use(
    cors({
        origin: ['http://localhost:3000'], // 허용할 도메인 설정
        credentials: true, // 쿠키 전송 허용
    }),
);

app.use('/api/auth', authRouter);
app.use('/api/coding', codingPostRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    res.status(404).json({ error: error.message });
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

    res.status(err.status || 500).json({ error: err.message });
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`);
});
