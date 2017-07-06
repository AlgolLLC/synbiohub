const pug = require('pug')

const db = require('../db')

const config = require('../config')

module.exports = function (req, res) {
    db.model.Group.findAll().then(dbGroups => {

        return dbGroups.map(group => {
            let canJoin = true;
            let canDelete = false;

            return group.hasUser(req.user).then(result => {
                if (result) {
                    canJoin = false;
                }

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
        })
    }).then(groups => {
       //console.log(Promise.resolve(groups))
        var locals = {
            config: config.get(),
            section: 'admin',
            adminSection: 'remotes',
            user: req.user,
            groups: Promise.resolve(groups)
        }

        res.send(pug.renderFile('templates/views/groups.jade', locals))
    }).catch((err) => {
        res.status(500).send(err.stack)
    });

}