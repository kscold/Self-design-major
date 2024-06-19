const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
const cors = require('cors');
const connectMongo = require('./schemas');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

dotenv.config();

const usersRouter = require('./routes/user');
const codingPostRouter = require('./routes/codingPage');
const chatRouter = require('./routes/chat');

const passportConfig = require('./passport');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    path: '/socket.io',
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
    // transports: ['websocket'], // WebSocket만 사용하도록 설정, 현재하면 연결이 안됨
});

passportConfig();

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({
        mongoUrl: `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:27017/admin`,
    }),
    cookie: {
        httpOnly: true,
        secure: false,
    },
});

app.set('port', process.env.PORT || 8080);

sequelize
    .sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

connectMongo();

app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);

// Socket.IO와 Express 세션 공유
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

io.on('connection', (socket) => {
    console.log('새로운 클라이언트 연결');

    const userId = socket.request.session?.passport?.user;
    if (userId) {
        User.findByPk(userId).then((user) => {
            if (user) {
                socket.join(user.nickname);
                console.log(`${user.nickname} 님이 연결되었습니다.`);
            }
        });
    }

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Joined room: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('클라이언트 연결 해제');
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/', usersRouter);
app.use('/api/chat', chatRouter);
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

server.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`);
});

// MongoDB 초기화
const clearMongoCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            if (error.message === 'ns not found') return;
            console.error(error);
        }
    }
};

mongoose.connection.once('open', async () => {
    console.log('몽고디비 연결 성공');
    await clearMongoCollections();
});
