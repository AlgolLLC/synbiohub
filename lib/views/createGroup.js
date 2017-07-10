const db = require('../db');
const extend = require('xtend');
const config = require('../config');
const pug = require('pug');

function post(req, res) {
    if (req.body.name == undefined || req.body.name == "") {
        return form(req, res, {
            form: req.form
        });
    }

    if (req.body.description == undefined || req.body.description == "") {
        return form(req, res, {
            form: req.form
        });
    }

    db.model.Group.create({
        name: req.body.name,
        description: req.body.description
    }).then(group => {
        req.user.addGroup(group, {
            through: {
                role: 'owner'
            }
        })
        req.user.save();
        res.redirect('/groups/' + group.id + '/')
    })
}


function form(req, res, locals) {

    locals = extend({
        config: config.get(),
        user: req.user,
        form: locals.form || {}
    }, locals);

    res.send(pug.renderFile('templates/views/groupForm.jade', locals))

}

module.exports = function (req, res) {
    if (req.method == "POST") {
        post(req, res)
    } else {
        form(req, res, {})
    }
}