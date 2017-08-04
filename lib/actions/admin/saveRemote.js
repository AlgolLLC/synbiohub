const db = require('../../db');

module.exports = function (req, res) {
    var data = reqToRemote(req);

    db.model.Remote.findOne({
        where: {
            name: req.body.id
        }
    }).then(remote => {
        if(remote === null) {
            db.model.Remote.create(data); 
        } else {
            remote.update(data);
        }
    })

    res.redirect('/admin/remotes')
}

function reqToRemote(req) {
    if (req.body.type == 'ice') {
        return reqToIce(req)
    } else if (req.body.type == 'benchling') {
        return reqToBenchling(req)
    }
}

function reqToBenchling(req) {
    return {
        name: req.body.id,
        type: req.body.type,
        url: req.body.url,
        rejectUnauthorized: req.body.rejectUnauthorized != undefined && req.body.rejectUnauthorized === "on",
        folderPrefix: req.body.folderPrefix,
        sequenceSuffix: req.body.sequenceSuffix,
        defaultFolderId: req.body.defaultFolderId,
        public: req.body.isPublic != undefined && req.body.isPublic === "on",
        rootCollectionDisplayId: req.body.rootCollectionDisplayId,
        rootCollectionName: req.body.rootCollectionName,
        rootCollectionDescription: req.body.rootCollectionDescription,
        benchlingApiToken: req.body.benchlingApiToken,
    }
}

function reqToIce(req) {
    return {
        name: req.body.id,
        type: req.body.type,
        url: req.body.url,
        rejectUnauthorized: req.body.rejectUnauthorized != undefined && req.body.rejectUnauthorized === "on",
        folderPrefix: req.body.folderPrefix,
        sequenceSuffix: req.body.sequenceSuffix,
        defaultFolderId: req.body.defaultFolderId,
        public: req.body.isPublic != undefined && req.body.isPublic === "on",
        rootCollectionDisplayId: req.body.rootCollectionDisplayId,
        rootCollectionName: req.body.rootCollectionName,
        rootCollectionDescription: req.body.rootCollectionDescription,
        partNumberPrefix: req.body.partNumberPrefix,
        groupId: req.body.groupId,
        PI: req.body.pi,
        PIemail: req.body.piEmail,
        iceApiTokenClient: req.body.iceApiTokenClient,
        iceApiToken: req.body.iceApiToken,
        iceApiTokenOwner: req.body.iceApiTokenOwner,
        iceCollection: req.body.iceCollection,
    }
}