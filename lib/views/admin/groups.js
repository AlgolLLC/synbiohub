const pug = require('pug')

const sparql = require('../../sparql/sparql')

const db = require('../../db')

const config = require('../../config')

const {
    getSnapshots
} = require('../../snapshots')

module.exports = function (req, res) {

    db.model.Group.findAll().then((dbGroups) => {

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
            section: 'admin',
            adminSection: 'remotes',
            user: req.user,
            groups: groups
        }

        res.send(pug.renderFile('templates/views/admin/groups.jade', locals))

    }).catch((err) => {
        res.status(500).send(err.stack)
    });

}