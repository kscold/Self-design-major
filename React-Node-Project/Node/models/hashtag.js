const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize) {
        Hashtag.init(
            {
                title: {
                    type: Sequelize.STRING(15),
                    allowNull: true,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true, // createdAt, updatedAt 자동 기록
                underscored: false, // created_at, updated_at
                paranoid: false, // deletedAt 유저 삭제일(소프트 delete를 위하여)
                modelName: 'Hashtag', // 자바스크립트에서 이름
                tableName: 'hashtags', // 테이블 이름
                charset: 'utf8mb4', // 이모티콘까지 저장할려면 utf8mb4
                collate: 'utf8mb4_general_ci', // 정렬 방식
            },
        );
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.CodingPost, {
            through: 'CodingPostHashtag',
        });
    }
}

module.exports = Hashtag;
