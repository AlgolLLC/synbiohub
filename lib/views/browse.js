

var pug = require('pug')

var search = require('../search')

var config = require('../config')

var loadTemplate = require('../loadTemplate')

var sparql = require('../sparql/sparql')

const { getRootCollectionMetadata } = require('../query/collection')

const uriToUrl = require('../uriToUrl')

module.exports = function(req, res) {

    getRootCollectionMetadata(req.params.store,req.user)
        .then((collections) => {

        const collectionIcons = config.get('collectionIcons')

        collections.forEach((collection) => {

            console.log(config.get('databasePrefix') + collection.uri)

            collection.url = uriToUrl(collection.uri)

            if (req.url.endsWith('/share')) {
                url += '/' + sha1('synbiohub_' + sha1(collection.uri) + config.get('shareLinkSalt')) + '/share'
            }
            collection.icon = collectionIcons[collection.uri]

	    const remoteConfig = config.get('remotes')[collection.displayId.replace('_collection','')]
	    if (remoteConfig !== undefined && !remoteConfig.public && collection.version === 'current') {
		collection.public = false
	    } else {
		collection.public = true
	    }

        })

        var locals = {
            config: config.get(),
            section: 'browse',
            title: 'Browse Parts and Designs ‒ ' + config.get('instanceName'),
            metaDesc: 'Browse ' + collections.length + ' collection(s) including ' + collections.map((collection) => collection.name).join(', '),
            user: req.user,
            collections: collections
        }

        res.send(pug.renderFile('templates/views/browse.jade', locals))
        
    }).catch((err) => { 

        locals = {
            config: config.get(),
            section: 'errors',
            user: req.user,
            errors: [ err.stack ]
        }

        res.send(pug.renderFile('templates/views/errors/errors.jade', locals))


    })


}


