const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init(
            {
                comment: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
                // belongsTo가 있으므로 이 부분에 외래키가 걸릴 것임
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'Comment',
                tableName: 'comments',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    // User 테이블에서 일대다를 설정했으므로 Comment 테이블에도 다대일 관계를 설정해야 함
    static associate(db) {
        // Comment는 Uset에 속해있음(blongsTo)
        db.Comment.belongsTo(db.User, {
            foreignKey: 'commenter', // 외래키는 이름이 똑같음
            targetKey: 'id', // 이 경우는 남이기 때문에 sourcekey가 아니라 targetKey임
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
        });
    }
}

module.exports = Comment;
