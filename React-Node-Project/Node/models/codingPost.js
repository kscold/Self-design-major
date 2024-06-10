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
                images: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                hashtags: {
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

    static associate(db) {
        db.CodingPost.belongsTo(db.User, { foreignKey: 'userId' });
        db.CodingPost.belongsTo(db.CodingPostSidebar, {
            foreignKey: 'sidebarId',
            as: 'sidebar',
        });
        db.CodingPost.belongsToMany(db.Hashtag, {
            through: 'CodingPostHashtag',
        });
    }
}

module.exports = CodingPost;
