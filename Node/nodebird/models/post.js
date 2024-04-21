const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init(
            {
                content: {
                    type: Sequelize.STRING(140),
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // createdAt, updatedAt 자동 기록
                underscored: false, // created_at, updated_at
                modelName: 'Post', // 자바스크립트에서 이름
                tableName: 'posts', // 테이블 이름
                paranoid: false, // deletedAt 유저 삭제일(소프트 delete를 위하여)
                charset: 'utf8', // 이모티콘까지 저장할려면 utf8mb4
                collate: 'utf8_general_ci', // 정렬 방식
            }
        );
    }

    static associate(db) {}
}

module.exports = Post;
