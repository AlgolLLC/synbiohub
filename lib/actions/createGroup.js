const db = require('../db');

module.exports = function (req, res) {
    if(req.method == "POST") {


        console.log(req.body)
        if(req.body.name == undefined || req.body.name == "") {
            console.log("ERROR")
        }

        if(req.body.description == undefined || req.body.description == "") {
            console.log("ERROR")
        }

        db.model.Group.create({
            name: req.body.name,
            description: req.body.description
        }).then(group => {
            req.user.addGroup(group, {through: {role: 'owner'}})
            req.user.save();
            res.redirect('/groups')
        })
    }
}