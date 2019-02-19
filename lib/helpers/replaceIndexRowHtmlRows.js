var async = require('async')

module.exports = function replaceIndexRowHtmlRows(req, res, forestay, cb) {
    async.eachOfSeries(forestay.records, function eachRecord(row, index, cb) {
        if (typeof _.get(forestay.config, ['forestay', 'index', 'replaceIndexRowHtml']) === 'function') {
            forestay.config.forestay.index.replaceIndexRowHtml(req, res, forestay, row, function(err, forestay, row) {
                if (err) return cb(err)
                forestay.records[index] = row
                return cb(null, forestay)
            })
        } else {
            return cb(null)
        }
    }, function finishEachRecord(err) {
        if (err) return res.serverError(err)
        return cb(forestay)
    })
}
