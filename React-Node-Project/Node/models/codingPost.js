const Sequelize = require('sequelize');

class CodingPost extends Sequelize.Model {
    static initiate(sequelize) {
        // CodingPost 모델 초기화
        CodingPost.init(
            {
                codingPostId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                codingPostTitle: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                codingPostContent: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                codingPostHashtags: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                sidebarId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'CodingPost',
                tableName: 'codingposts',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 모델 간의 관계 설정
    static associate(db) {
        // CodingPost는 CodingPostSidebar에 속함 N:1 관계(여러 CodingPost가 하나의 Sidebar를 가리킴)
        db.CodingPost.belongsTo(db.CodingPostSidebar, {
            foreignKey: 'sidebarId',
            as: 'sidebar',
        });

        // CodingPost는 여러 Hashtag와 N:N 관계(중간 테이블 CodingPostHashtag를 통해 연결)
        db.CodingPost.belongsToMany(db.Hashtag, {
            through: 'CodingPostHashtag',
        });
    }
}

module.exports = CodingPost;
