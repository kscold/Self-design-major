const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            // init 메서드에 컬럼을 정의해서 넣을 수 있음
            {
                // 시퀄라이즈는 id를 자동으로 넣어주기 때문에 생략이 가능함
                name: {
                    type: Sequelize.STRING(20), // VARCHAR가 아니라 STRING임
                    allowNull: false,
                    unique: true,
                },
                age: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                married: {
                    type: Sequelize.BOOLEAN, // 시퀄라이즈에서는 BOOLEAN mysql에서는 TIMYINT
                    allowNull: false,
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE, // DATETIME. MYSQL DATE -> Sequelize DateOnly
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            // 모델에 대한 설정
            {
                sequelize,
                timestamps: false, // createdAt, UpdateAt을 잠깐 끄기 위해 false로 설정
                underscored: false, // 시퀄라이즈의 글자들을 스네이크케이스(_)로 할지 카멜케이스로 할지 설정
                paranoid: true, // true이면 deletedAt까지 만들어줌 또한 소프트 delete를 가능하게 해줌
                modelName: 'User', // 모델이름(자바스크립트에서 쓰는 이름)이 단수라면
                tableName: 'users', // 테이블이름(sql에서 사용하는 이름) 은 복수형으로 만들어줌
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        // User가 Comment를 많이 가지고 있음(일대다 관계)
        db.User.hasMany(db.Comment, {
            foreignKey: 'commenter', // Comment 테이블의 commenter 필드로 참고하고 있음
            sourceKey: 'id', // User의 id 필드를
        });
    }
}

module.exports = User;
