module.exports = function addNewCollections(forestay, newCollections, cb) {

    var newIds = {}

    if (newCollections.length < 1) return cb(null, null)
    async.eachOfSeries(newCollections, function(nc, key, cb) {

            if (_.get(forestay.config.attributes, [nc.key, 'meta', 'forestay', 'allowAddition']) !== true) return cb(null)
            var model = _.get(forestay.config.attributes, [nc.key, 'collection'])

            model = capitalizeFirstLetter(model)

            async.eachSeries(nc.records, function eachItem(r, cb) {

                var save = {}
                var populateBy = _.get(forestay.config.attributes, [nc.key, 'meta', 'forestay', 'populateBy'])
                save[populateBy] = htmlSanitize(r[populateBy], {
                    allowedTags: [],
                    allowedAttributes: []
                })

                global[model].create(save).fetch().exec(function(err, record) {

                    if (err) return cb(err)
                    if (typeof newIds[nc.key] == "undefined") newIds[nc.key] = []
                    newIds[nc.key].push(record.id)

                    return cb(null)
                })
            }, function doneEachItem(err) {

                return cb(null)
            })
        },
        function endEachNewCollection(err) {
            if (err) return cb(err)
            return cb(null, newIds)
        })
}
