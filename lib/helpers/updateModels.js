const async = require('async')
module.exports = function updateModels(forestay, models, cb) {
    if (models.length < 1) return cb(null)
    async.eachSeries(models, function eachModel(m, cb) {
        var id
        if (m.linkedId === '' || m.linkedId === null) id = null
        else id = parseInt(m.linkedId) // the id of the model reference
        var save = {}
        save[m.key] = id
        forestay.model.update({
            id: forestay.id
        }, save, function(err) {
            if (err) return cb(err)
            return cb(null)
        })
    }, function eachModelDone(err) {
        if (err) return cb(err)
        return cb(null)
    })
}
