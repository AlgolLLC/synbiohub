const pug = require('pug')

const db = require('../db')

const config = require('../config')

module.exports = function (req, res) { 
    db.model.Group.findAll().then(dbGroups => {
        let groups = dbGroups.map(group => {
            let canJoin = true;
            let canDelete = false;

                return {
                    id: group.id,
                    name: group.name,
                    website: group.website,
                    icon: group.icon,
                    description: group.description == undefined ? "" : group.description.length > 137 ? group.description.substring(0, 137) + "..." : group.description,
                    joinable: canJoin,
                    deletable: !canJoin,
                }
        })

        var locals = {
            config: config.get(),
            section: 'index',
            user: req.user,
            groups: groups
        }

        res.send(pug.renderFile('templates/views/groups.jade', locals))
    }).catch((err) => {
        res.status(500).send(err.stack)
    });

}