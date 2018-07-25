var routeRequest = require("./../config/routeRequest")

module.exports = function(req, res) {

    if (typeof _.get(req.options, ['forestay', 'model']) !== 'string') return res.serverError('forestay ERROR: Please add the associated model to your route.')
    // build forestay object
    var configPaths = {
        config: process.env.PWD + '/api/models/' + req.options.forestay.model,
        localConfig: process.env.PWD + '/config/forestay.js',
        routes: process.env.PWD + '/config/routes.js'
    }

    // invliadate require caches!
    delete require.cache[require.resolve(configPaths.config)]
    delete require.cache[require.resolve(configPaths.localConfig)]
    delete require.cache[require.resolve(configPaths.routes)]

    var forestay = {
        model: global[req.options.forestay.model],
        config: require(configPaths.config), // TODO: Maybe there's a better way than process.env.PWD - Or maybe there's a way to get the attributes and meta from somewhere else.  It's not in the model object.  Mike?
        localConfig: require(configPaths.localConfig),
        routes: require(configPaths.routes).routes,

    }
    // set the name
    forestay.model.name = req.options.forestay.model
    // parse args
    if (!req.url.startsWith(forestay.config.forestay.urlPrefix)) {
        console.log('forestay ERROR: The model.forestay.urlPrefix isn\'t at the beginning of the URL.  Likely a configuration error'.red)
        return res.notFound()
    }

    var trimmedUrl = req.url.substring(forestay.config.forestay.urlPrefix.length)
    var args = trimmedUrl.split('?')[0].split('?')[0].split('/')
    if (args[0] === '') args[0] = 'index'
    forestay.args = args
    forestay.query = req.query

    if (typeof _.get(forestay.config, ['forestay', 'beforeRoute']) === 'function') {
        forestay.config.forestay.beforeRoute(req, res, forestay, function(err, forestay) {
            if (err) return res.serverError(err)

            routeRequest(args, forestay, req, res)
        })
    } else {
        routeRequest(args, forestay, req, res)
    }

    /* route this to the correct CRUD operation */

}
