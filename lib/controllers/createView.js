const path = require('path')
const viewBase = path.join(__dirname, '../..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'
var helpers = require("./../helpers/helpers")

module.exports = function(forestay, req, res) {
    helpers.populateOne(forestay, function(err, forestay) {
        if (err) return res.serverError(err)
        forestay.prefills = {}

        Object.keys(forestay.config.attributes).forEach(function(attrKey) {
            if (_.get(forestay.config.attributes[attrKey], ['meta', 'forestay', 'prefillable']) === true) {
                if (typeof _.get(req.query, [attrKey]) === 'string') forestay.prefills[attrKey] = req.query[attrKey]
            }
        })
        if (typeof _.get(forestay.config.forestay, ['createUpdate', 'beforeUpdateCreateView']) === 'function') {
            forestay.config.forestay.createUpdate.beforeUpdateCreateView(req, res, forestay, function(err, forestay) {
                if (err) res.serverError(err)
                res.view(viewBase + '/createUpdate.ejs', {
                    layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
                    forestay
                })
            })
        } else {
            res.view(viewBase + '/createUpdate.ejs', {
                layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
                forestay
            })
        }
    })
}
