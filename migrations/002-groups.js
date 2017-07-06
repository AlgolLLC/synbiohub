var Bluebird = require('bluebird');

module.exports = {
    up: (query, DataTypes) => {
        return query.sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('group', 'groupMembership')", {
                type: DataTypes.QueryTypes.SELECT
            })
            .then(rows => {
                let groupPresent = false;
                let groupMembershipPresent = false;

                rows.forEach(row => {
                    if (row.name == "group") {
                        groupPresent = true;
                    }

                    if (row.name == "groupMembership") {
                        groupMembershipPresent = true;
                    }
                })

                if (!groupPresent) {
                    query.createTable('group', {
                        id: {
                            type: DataTypes.INTEGER,
                            autoIncrement: true,
                            primaryKey: true
                        },
                        name: {
                            type: DataTypes.STRING
                        },
                        graphUri: {
                            type: DataTypes.STRING
                        },
                        website: {
                            type: DataTypes.STRING
                        },
                        description: {
                            type: DataTypes.TEXT
                        },
                        icon: {
                            type: DataTypes.STRING
                        },
                        createdAt: {
                            type: DataTypes.DATE,
                            allowNull: false
                        },
                        updatedAt: {
                            type: DataTypes.DATE,
                            allowNull: false
                        }
                    }, {})
                }

                if (!groupMembershipPresent) {
                    query.createTable('groupMembership', {
                        role: {
                            type: DataTypes.STRING
                        },
                        createdAt: {
                            type: DataTypes.DATE,
                            allowNull: false
                        },
                        updatedAt: {
                            type: DataTypes.DATE,
                            allowNull: false
                        },
                        userId: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            references: {
                                model: 'user',
                                key: 'id'
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: false
                        },
                        groupId: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            references: {
                                model: 'group',
                                key: 'id'
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: false
                        }
                    }, {})
                }
            })
    },

    down: (query, DataTypes) => {
        return query.sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='group'", {
                type: DataTypes.QueryTypes.SELECT
            })
            .then(rows => {
                let groupPresent = false;
                let groupMembershipPresent = false;

                rows.forEach(row => {
                    if (row.name == "group") {
                        groupPresent = true;
                    }

                    if (row.name == "groupMembership") {
                        groupMembershipPresent = true;
                    }
                })

                if (groupMembershipPresent) {
                    query.dropTable('groupMembership', {})
                }

                if (groupPresent) {
                    query.dropTable('group', {})
                }
            })
    }
};