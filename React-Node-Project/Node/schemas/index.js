const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connect = async () => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        await mongoose.connect(
            `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:27017/admin`,
            {
                dbName: 'blogChat',
                useNewUrlParser: true,
                useUnifiedTopology: true, // 이 옵션을 추가하여 경고를 방지하고 최신 드라이버 사용
            },
        );
        console.log('몽고디비 연결 성공');
    } catch (error) {
        console.error('몽고디비 연결 에러', error);
    }
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;
