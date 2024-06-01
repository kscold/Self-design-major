const Sequelize = require('sequelize');

class Domain extends Sequelize.Model {
    static initiate(sequelize) {
        Domain.init(
            {
                host: {
                    type: Sequelize.STRING(80),
                    allowNull: false,
                },
                type: {
                    type: Sequelize.ENUM('free', 'premium'),
                    allowNull: false,
                },
                clientSecret: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: true, // paranoid는 레코드를 삭제할 때 실제로 삭제하지 않고 deletedAt 컬럼에 timestamp 값을 넣음
                modelName: 'Domain',
                tableName: 'domains',
            },
        );
    }

    static associate(db) {
        db.Domain.belongsTo(db.User);
    }
}

module.exports = Domain;
