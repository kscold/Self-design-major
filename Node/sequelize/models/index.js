const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// new Sequelize는 클래스 객체이기 때문에 인스턴스화를 여러개를 시킨다면 2개 이상의 mysql에 접속도 가능함
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

module.exports = db;
