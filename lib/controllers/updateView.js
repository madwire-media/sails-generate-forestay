const path = require('path')
const viewBase = path.join(__dirname, '../..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'
var helpers = require("./../helpers/helpers")

module.exports = function(forestay, req, res) {
    forestay.model.find({
        id: forestay.id
    }).limit(1).exec(function(err, record) {
        if (err) res.serverError(err)
        if (record.length === 0) return res.send('record not found')

        helpers.populateOne(req, res, forestay, function(err, forestay) {
            if (err) return res.serverError(err)

            record = record[0]
            res.view(viewBase + '/createUpdate.ejs', {
                layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
                forestay,
                record
            })
        })
    })
}
