
var config = require('./lib/config')

var App = require('./lib/app')

var db = require('./lib/db')

var fs = require('fs')

var jobUtils = require('./lib/jobs/job-utils')

if(!fs.existsSync('synbiohub.sqlite')) {

    db.sequelize.sync({ force: true }).then(startServer)

} else {

    startServer()

}

function startServer() {

    return jobUtils.setRunningJobsToQueued()
                .then(() => jobUtils.resumeAllJobs())
                .then(() => {

        var app = new App()

        app.listen(parseInt(config.get('port')))

    })
}


