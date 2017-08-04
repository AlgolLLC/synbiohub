const db = reqire('../../db');

module.exports = function (req, res) {
    const remoteId = req.body.id

    db.model.Remote.find({
        where: {
            name: remoteId
        }
    }).then(remote => {
        remote.destroy();
    });

    res.redirect('/admin/remotes')
}