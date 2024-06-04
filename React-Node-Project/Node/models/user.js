const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                loginId: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nickname: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                role: {
                    type: Sequelize.ENUM('user', 'admin'),
                    allowNull: false,
                    defaultValue: 'user',
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
        db.User.hasMany(db.CodingPost, {
            foreignKey: 'userId',
            as: 'codingPosts',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }
}

module.exports = User;
