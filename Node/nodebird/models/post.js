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

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        // 중간 테이블에 접근해야되면 db.sequelize.models.PostHashtag 형식으로 접근할 수 있음
    }
}

module.exports = Post;
