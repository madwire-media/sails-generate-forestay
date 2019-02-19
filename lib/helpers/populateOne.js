const _ = require('lodash')
const async = require('async')
module.exports = function populateOne(req, res, forestay, cb) { // populateOne populates a models that specify populateUi: "select" with available and selected values
    var modelName, viaName

    async.forEachOf(forestay.config.attributes, function(item, i, cb){
        if (typeof _.get(forestay.config.attributes[i], ['collection']) === 'string') {
            modelName = _.str.capitalize(_.get(forestay.config.attributes[i], ['collection']))
            viaName = _.get(forestay.config.attributes[i], ['via'])

            if(_.get(forestay.config.attributes[i], ['meta','forestay','hideInForm']) === true) return cb(null)

            if(typeof _.get(forestay.config.attributes[i], ['meta','forestay','filterCriteria']) != 'undefined') {
              var filterCriteria = _.get(forestay.config.attributes[i], ['meta','forestay','filterCriteria']);
              filterCriteria(req, res, forestay,function(userDefinedCriteria) {
                global[modelName].find(userDefinedCriteria).populate(viaName).exec(function(err, result) {
                    if (err) return cb(err)
                    forestay.config.attributes[i].availableValues = result
                    if (!forestay.id) return cb(null)

                    forestay.model.find({
                        id: forestay.id
                    }).populate(i).exec(function(err, record) {
                        if (err) return cb(err)
                        var m = record[0]
                        forestay.config.attributes[i].selectedValues = m[i]
                        return cb(null)
                    })
                })
              })
            } else{
              modelName = sails.models[_.get(forestay.config.attributes[i], ['collection']).toLowerCase()];
              modelName.find().populate(viaName).exec(function(err, result) {
                  if (err) return cb(err)
                  forestay.config.attributes[i].availableValues = result
                  if (!forestay.id) return cb(null)

                  forestay.model.find({
                      id: forestay.id
                  }).populate(i).exec(function(err, record) {
                      if (err) return cb(err)
                      var m = record[0]
                      forestay.config.attributes[i].selectedValues = m[i]
                      return cb(null)
                  })
              })
            }
        } else if (typeof _.get(forestay.config.attributes[i], ['model']) === 'string') {
            modelName = sails.models[_.get(forestay.config.attributes[i], ['model']).toLowerCase()];
            //modelName = _.str.capitalize(_.get(forestay.config.attributes[i], ['model']))
            // var viaName = _.get(forestay.config.attributes[i], ['via'])

            modelName.find().exec(function(err, r) {
                if (err) return cb(err)
                forestay.config.attributes[i].availableValues = r
                if (forestay.id) {

                  forestay.model.find({
                      where: {
                          id: forestay.id
                      }
                  }).populate(i).exec(function(err, result) {
                      if (err) return cb(err)
                      forestay.config.attributes[i].selectedValue = result
                      return cb(null)
                  })

                } else {
                  return cb(null)
                }
            })
        } else {
            return cb(null)
        }
    }, function endSeries(err) {
        if (err) return cb(err)
        return cb(null, forestay)
    })
}
