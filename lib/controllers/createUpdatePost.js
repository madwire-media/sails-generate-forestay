const _ = require('lodash')
const xss = require("xss")
var helpers = require("./../helpers/helpers")

module.exports = function(forestay, req, res) {
    var save = {}
    var collections = []
    var models = []
    var newCollections = []


    Object.keys(forestay.config.attributes).forEach(function(attrKey) {
        var attributeType = _.get(forestay.config.attributes[attrKey], 'type') || _.get(forestay.config.attributes, [attrKey]) || ''
        if (typeof _.get(forestay.config.attributes[attrKey], ['collection']) === 'string') {
            if (_.get(forestay.config.attributes[attrKey], ['meta', 'forestay', 'createUpdateUi']) === 'tagging') {
                var tags = JSON.parse(req.body[attrKey])
                var l = []
                var newCollection = []
                tags.forEach(function(e, i) {
                    if (e.id) l.push(e.id)
                    else newCollection.push(e)
                })
                req.body[attrKey] = l
            }

            attributeType = 'collection'
            if (req.body[attrKey] === '') req.body[attrKey] = null
            collections.push({
                key: attrKey,
                linkedIds: req.body[attrKey]
            })
            newCollections.push({
                key: attrKey,
                records: newCollection
            })
        }

        if (typeof _.get(forestay.config.attributes[attrKey], ['model']) === 'string') {
            attributeType = 'model'
            if (req.body[attrKey] === '' || req.body[attrKey] === NaN || req.body[attrKey] == '') req.body[attrKey] = null
            if (typeof req.body[attrKey] !== 'undefined' && req.body[attrKey] !== null) save[attrKey] = parseInt(req.body[attrKey])
            if (req.body[attrKey] === null) save[attrKey] = null
            // models.push({
            //   key: attrKey,
            //   linkedId: req.body[attrKey]
            // })
        }
        attributeType = attributeType.toLowerCase()
        // Note: No need to check for enum, we just store the string.
        if (typeof _.get(req.body, attrKey) === 'string') {
            if (attributeType === 'number') {
                if (req.body[attrKey] === '') req.body[attrKey] = 0
                save[attrKey] = req.body[attrKey]
            }
            if (attributeType === 'string' || attributeType === 'text') {
                save[attrKey] = xss(req.body[attrKey])
            } else if (attributeType === 'boolean') {
                if (req.body[attrKey].toLowerCase() === 'true' || req.body[attrKey] === '1') {
                    save[attrKey] = true
                } else if (req.body[attrKey].toLowerCase() === 'false' || req.body[attrKey] === '0') {
                    save[attrKey] = false
                }
            }
        }
    })

    if (forestay.id) { // update
        forestay.save = save
        if (typeof _.get(forestay.config, ['forestay', 'beforeUpdate']) === 'function') {
            forestay.config.forestay.beforeUpdate(req, res, forestay, function(err, forestay) {

                return finishUpdate(forestay)
            })
        } else {
            return finishUpdate(forestay)
        }
    } else { // create
        forestay.save = save
        if (typeof _.get(forestay.config, ['forestay', 'beforeCreate']) === 'function') {
            forestay.config.forestay.beforeCreate(req, res, forestay, function(err, forestay) {

                if (err) return res.serverError(err)
                finishCreate(forestay)
            })
        } else {
            finishCreate(forestay)
        }
    }

    function finishUpdate(forestay) {
        forestay.model.update({ id: forestay.id }, save).fetch().exec(function(err, saved) {
            if (err) return res.serverError(err)
            helpers.updateCollectionsAndModels(forestay, collections, newCollections, models, function(err) {
                if (err) console.log('error!', err)

                forestay.saved = saved[0]
                if (typeof _.get(forestay.config, ['forestay', 'afterUpdate']) === 'function') {
                  forestay.config.forestay.afterUpdate(req, res, forestay, function (err, forestay) {
                    if (err) return res.serverError(err)
                    return res.redirect(helpers.getReturnUrl(forestay))
                  })
                }
                else {
                    return res.redirect(helpers.getReturnUrl(forestay))
                }

            })
        })
    }

    function finishCreate(forestay) {
      forestay.model.create(forestay.save).fetch().exec(function(err, model){
        if(err) return res.serverError(err)
        forestay.id = model.id

        helpers.updateCollectionsAndModels(forestay, collections,newCollections, models, function (err) {
          if (err) console.log('error!')
          //delete forestay.save
          forestay.saved = model
          if (typeof _.get(forestay.config, ['forestay', 'afterCreate']) === 'function') {
            forestay.config.forestay.afterCreate(req, res, forestay, function (err, forestay) {
              if (err) return res.serverError(err)
              return res.redirect(helpers.getReturnUrl(forestay))
            })
          } else {
            return res.redirect(helpers.getReturnUrl(forestay))
          }
        })
    })
  }
}
