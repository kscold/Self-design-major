const Sequelize = require('sequelize');

class CodingPost extends Sequelize.Model {
    static initiate(sequelize) {
        CodingPost.init(
            {
                contentId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(200),
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
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'CodingPost',
                tableName: 'posts',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
        db.CodingPost.belongsTo(db.User, { foreignKey: 'userId' });
        db.CodingPost.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    }
}

module.exports = CodingPost;
