module.exports = function updateCollections(forestay, collections, cb) {

    if (collections.length < 1) return cb(null)

    async.eachSeries(collections, function eachCollection(c, cb) {

        var this_attr = forestay.config.attributes[c.key];
        if (_.get(this_attr, ["meta","forestay","hideInForm"]) === true){
          // do nothing if this field is meant to be hidden
          return cb(null);
        }

        var ids = []

        if (typeof _.get(c, 'linkedIds') === 'undefined' || c.linkedIds.length === 0) {
            forestay.model.find({
                id: forestay.id
            }).populate(c.key).exec(function(err, r) {
                if (err) return res.serverError(err)
                if (!r) return res.notFound()

                var oldIds = r[0][c.key];
                if (oldIds.length > 0) {
                    oldIds.forEach(function(thisc) {
                        ids.push(parseInt(thisc.id))
                    })

                    forestay.model.removeFromCollection(forestay.id, c.key).members(ids).then(() => {
                        return cb(null)
                    })

                } else {
                    return cb(null);
                }
            })
        } else {
            c.linkedIds.forEach(function(thisc) {
                ids.push(parseInt(thisc))
            })
            forestay.model.replaceCollection(forestay.id, c.key).members(ids).then(() => {
                return cb(null)
            })
        }
    }, function eachCollectionDone(err) {
        if (err) return cb(err)
        return cb(null)
    })
}
