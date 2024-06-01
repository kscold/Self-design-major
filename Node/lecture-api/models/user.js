const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                email: {
                    type: Sequelize.STRING(40), // VARCHAR 40
                    allowNull: true, // NULL
                    unique: true, // 유니크
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false, // NOT NULL
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.ENUM('local', 'kakao'), // 선택권을 주기 위해서 ENUM으로 설정
                    allowNull: false,
                    defaultValue: 'local', // 기본값은 local
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // createdAt, updatedAt 자동 기록
                underscored: false, // created_at, updated_at
                modelName: 'User', // 자바스크립트에서 이름
                tableName: 'users', // 테이블 이름
                paranoid: true, // deletedAt 유저 삭제일(소프트 delete를 위하여)
                charset: 'utf8', // 이모티콘까지 저장할려면 utf8mb4
                collate: 'utf8_general_ci', // 정렬 방식
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            // 팔로워
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            // 팔로잉
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
        db.User.hasMany(db.Domain);
    }
}

module.exports = User;
