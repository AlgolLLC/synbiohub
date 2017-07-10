const pug = require('pug')

const db = require('../db')

const config = require('../config')

module.exports = function (req, res) {

    db.model.User.findById(req.user.id).then(user => {
        user.getGroups().then((dbGroups) => {

            let groups = dbGroups.map(group => {
                return {
                    id: group.id,
                    name: group.name,
                    website: group.website,
                    icon: group.icon,
                    description: group.description.length > 137 ? group.description.substring(0, 137) + "..." : group.description
                }
            })

            var locals = {
                config: config.get(),
                section: 'index',
                user: req.user,
                groups: groups
            }

            res.send(pug.renderFile('templates/views/groups.jade', locals))

        })
    }).catch((err) => {
        res.status(500).send(err.stack)
    });

}