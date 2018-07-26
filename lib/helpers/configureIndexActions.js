const Route = require('route-parser')

module.exports = function configureIndexActions(forestay, cb) {
    var route
    if (_.get(forestay.config.forestay, ['actions'])) {
        Object.keys(forestay.config.forestay.actions).forEach(function(actionKey) {
            if (forestay.config.forestay.actions[actionKey].type === 'record') {
                route = new Route(actionKey)
                forestay.records.forEach(function(r, i) {
                    if (typeof forestay.records[i].actions !== 'object') forestay.records[i].actions = {}
                    forestay.records[i].actions[actionKey] = {
                        link: route.reverse(r),
                        label: _.get(forestay.config.forestay.actions[actionKey], ['label']) || 'Action'
                    }
                })
            }
            // no else if needed, forestay.config.forestay.actions[actionKey].type === 'index' isn't needed because it's a direct route
        })
        return cb(forestay)
    } else {
        return cb(forestay)
    }
}
