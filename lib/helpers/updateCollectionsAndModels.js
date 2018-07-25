const _ = require('lodash')
var addNewCollections = require("./addNewCollections")
var updateCollections= require("./updateCollections")
var updateModels =require("./updateModels")

module.exports = function updateCollectionsAndModels(forestay, collections, newCollections, models, cb) {

    addNewCollections(forestay, newCollections, function(err, newIds) {

        if (err) return cb(err)
        // add linkedids
        collections.forEach(function(c, k) {
            if (typeof _.get(newIds, c.key) != "undefined" && _.get(newIds, c.key).length > 0) {

                newIds[c.key].forEach(function(id) {
                    collections[k].linkedIds.push(id)
                })
                //collections[k].linkedIds.concat(newIds[c.key])

            }

        })

        updateCollections(forestay, collections, function(err) {
            if (err) return cb(err)
            updateModels(forestay, models, function(err) {
                if (err) return cb(err)
                return cb(null)
            })
        })
    })

}
