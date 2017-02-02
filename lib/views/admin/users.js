
const pug = require('pug')

const sparql = require('../../sparql/sparql')

const db = require('../../db')

module.exports = function(req, res) {

    db.model.User.findAll().then((users) => {

        var locals = {
            section: 'admin',
            adminSection: 'users',
            user: req.user,
            users: users
        }

        res.send(pug.renderFile('templates/views/admin/users.jade', locals))

    }).catch((err) => {

        res.status(500).send(err.stack)

    })


};