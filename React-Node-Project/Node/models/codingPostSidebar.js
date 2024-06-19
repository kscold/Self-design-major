const Sequelize = require('sequelize');

class CodingPostSidebar extends Sequelize.Model {
    static initiate(sequelize) {
        CodingPostSidebar.init(
            {
                sidebarId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                sidebarName: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                depth: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                url: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                parentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true, // parentId는 NULL이 아닌 기본값 0을 가지도록 설정
                    references: {
                        model: 'codingpostsidebars',
                        key: 'sidebarId',
                    },
                },
            },
            {
                sequelize,
                modelName: 'CodingPostSidebar',
                tableName: 'codingpostsidebars',
            },
        );
    }

    // 모델 간의 관계 설정
    static associate(db) {
        // CodingPostSidebar는 하위 사이드바들을 가질 수 있음 (1:N 관계)
        db.CodingPostSidebar.hasMany(db.CodingPostSidebar, {
            as: 'children',
            foreignKey: 'parentId',
        });

        // CodingPostSidebar는 상위 사이드바를 가질 수 있음 (N:1 관계)
        db.CodingPostSidebar.belongsTo(db.CodingPostSidebar, {
            as: 'parent',
            foreignKey: 'parentId',
        });

        // CodingPostSidebar는 여러 CodingPost를 가질 수 있음 (1:N 관계)
        db.CodingPostSidebar.hasMany(db.CodingPost, {
            foreignKey: 'sidebarId',
        });
    }
}

module.exports = CodingPostSidebar;
