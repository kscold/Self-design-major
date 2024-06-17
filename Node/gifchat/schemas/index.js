const mongoose = require('mongoose');

const connect = async () => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        await mongoose.connect(
            `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:27017/admin`,
            {
                dbName: 'gifchat',
                useNewUrlParser: true,
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

module.exports = connect;
