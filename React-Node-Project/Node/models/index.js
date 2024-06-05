const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

db.sequelize = sequelize; // 시퀄라이즈 설정 불러옴

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
        // 숨김파일과 현재 파일, js가 아닌 파일 제외
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        console.log(file, model.name);
        db[model.name] = model;
        model.initiate(sequelize); // initiate를 먼저 한 다음에 associate를 해야 함
    });

Object.keys(db).forEach((modelName) => {
    console.log(db, modelName);
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
