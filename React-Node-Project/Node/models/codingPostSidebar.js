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

    static associate(db) {
        db.CodingPostSidebar.hasMany(db.CodingPostSidebar, {
            as: 'children',
            foreignKey: 'parentId',
        });
        db.CodingPostSidebar.belongsTo(db.CodingPostSidebar, {
            as: 'parent',
            foreignKey: 'parentId',
        });
        db.CodingPostSidebar.hasMany(db.CodingPost, {
            foreignKey: 'sidebarId',
        });
    }
}

module.exports = CodingPostSidebar;
