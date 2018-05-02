const path = require('path')
const viewBase = path.join(__dirname, '..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'
const _ = require('lodash')
const xss = require('xss')
const colors = require('colors')
const async = require('async')
const Route = require('route-parser')

colors.enabled = true

module.exports = {
  router: function (req, res) {
    if (typeof _.get(req.options, ['forestay', 'model']) !== 'string') return res.serverError('forestay ERROR: Please add the associated model to your route.')
    // build forestay object
    var configPaths = {
      config: process.env.PWD + '/api/models/' + req.options.forestay.model,
      localConfig: process.env.PWD + '/config/forestay.js',
      routes: process.env.PWD + '/config/routes.js'
    }

    // invliadate require caches!
    delete require.cache[require.resolve(configPaths.config)]
    delete require.cache[require.resolve(configPaths.localConfig)]
    delete require.cache[require.resolve(configPaths.routes)]

    var forestay = {
      model: global[req.options.forestay.model],
      config: require(configPaths.config), // TODO: Maybe there's a better way than process.env.PWD - Or maybe there's a way to get the attributes and meta from somewhere else.  It's not in the model object.  Mike?
      localConfig: require(configPaths.localConfig),
      routes: require(configPaths.routes).routes
    }
    // set the name
    forestay.model.name = req.options.forestay.model
    // parse args
    if (!req.url.startsWith(forestay.config.forestay.urlPrefix)) {
      console.log('forestay ERROR: The model.forestay.urlPrefix isn\'t at the beginning of the URL.  Likely a configuration error'.red)
      return res.notFound()
    }

    var trimmedUrl = req.url.substring(forestay.config.forestay.urlPrefix.length)
    var args = trimmedUrl.split('?')[0].split('?')[0].split('/')
    forestay.query = req.query
    /* route this to the correct CRUD operation */
    if (req.method === 'GET') {
      if (isPositiveInteger(args[0]) && (args[1] === 'edit')) {
        forestay.id = args[0]
        return forestayHelpers.updateView(forestay, req, res)
      } else if (args[1] === 'populate') {
        forestay.populate = {
          field: args[2]
        }
        return forestayHelpers.populateView(forestay, req, res) // TODO For Ajax population and searching
      } else if (args[0] === 'create') {
        return forestayHelpers.createView(forestay, req, res)
      } else if (args[0] === '') {
        return forestayHelpers.index(forestay, req, res)
      } else {
        return res.notFound()
      }
    } else if (req.method === 'POST') {
      if (isPositiveInteger(args[0]) && args[1] === 'delete') {
        forestay.id = args[0]
        return forestayHelpers.deletePost(forestay, req, res)
      } else if (isPositiveInteger(args[0]) && (args[1] === 'edit')) {
        forestay.id = args[0]
        return forestayHelpers.createUpdatePost(forestay, req, res)
      } else if (args[0] === 'create') return forestayHelpers.createUpdatePost(forestay, req, res)
      else return res.notFound()
    }
    return res.notFound()
  }
}

var forestayHelpers = {
  index: function (forestay, req, res) {
    var filter = {}
    forestay.hasFilters = false
    Object.keys(forestay.config.attributes).forEach(function (attrKey) {
      if (_.get(forestay.config.attributes[attrKey], ['meta', 'forestay', 'filterable']) === true) {
        forestay.hasFilters = true
        if (typeof _.get(req.query, [attrKey]) !== 'undefined') filter[attrKey] = req.query[attrKey]
      }
    })
    forestay.filter = filter
    forestay.model.find(filter, function (err, records) {
      if (err) return res.serverError(err)
      var moment = require('moment')
      forestay.records = records
      replaceIndexRowHtmlRows (req, res, forestay, function (forestay) {
        configureIndexActions(forestay, function (forestay) {
          if (typeof _.get(forestay.config.forestay, ['index', 'beforeRender']) === 'function') {
            forestay.config.forestay.index.beforeRender(req, res, forestay, function (err, forestay) {
              if (err) return res.serverError(err)
              res.view(viewBase + '/index.ejs', {
                layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
                forestay,
                moment
              })
            })
          } else {
            res.view(viewBase + '/index.ejs', {
              layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
              forestay,
              moment
            })
          }
        })
      })
    })
  },
  createView: function (forestay, req, res) {
    populateOne(forestay, function (err, forestay) {
      if (err) return res.serverError(err)
      forestay.prefills = {}

      Object.keys(forestay.config.attributes).forEach(function (attrKey) {
        if (_.get(forestay.config.attributes[attrKey], ['meta', 'forestay', 'prefillable']) === true) {
          if (typeof _.get(req.query, [attrKey]) === 'string') forestay.prefills[attrKey] = req.query[attrKey]
        }
      })
      if (typeof _.get(forestay.config.forestay, ['createUpdate', 'beforeUpdateCreateView']) === 'function') {
        forestay.config.forestay.createUpdate.beforeUpdateCreateView(req, res, forestay, function (err, forestay) {
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
  },
  updateView: function (forestay, req, res) {
    forestay.model.find({
      id: forestay.id
    }).limit(1).exec(function (err, record) {
      if (err) res.serverError(err)
      if (record.length === 0) return res.send('record not found')
      populateOne(forestay, function (err, forestay) {
        if (err) return res.serverError(err)
        record = record[0]
        res.view(viewBase + '/createUpdate.ejs', {
          layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
          forestay,
          record
        })
      })
    })
  },
  createUpdatePost: function (forestay, req, res) {
    var save = {}
    var collections = []
    var models = []
    Object.keys(forestay.config.attributes).forEach(function (attrKey) {
      var attributeType = _.get(forestay.config.attributes[attrKey], 'type') || _.get(forestay.config.attributes, [attrKey]) || ''
      if (typeof _.get(forestay.config.attributes[attrKey], ['collection']) === 'string') {
        attributeType = 'collection'
        if (req.body[attrKey] === '') req.body[attrKey] = null
        collections.push({
          key: attrKey,
          linkedIds: req.body[attrKey]
        })
      }
      if (typeof _.get(forestay.config.attributes[attrKey], ['model']) === 'string') {
        attributeType = 'model'
        if (req.body[attrKey] === '') req.body[attrKey] = null
        models.push({
          key: attrKey,
          linkedId: req.body[attrKey]
        })
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
      forestay.model.update({
        id: forestay.id
      }, save, function (err, saved) {
        if (err) return res.serverError(err)
        updateCollectionsAndModels(forestay, collections, models, function (err) {
          if (err) console.log('error!', err)
          return res.redirect(forestay.config.forestay.urlPrefix)
        })
      })
    } else { // create
      forestay.save = save
      if (typeof _.get(forestay.config, ['forestay', 'index', 'beforeCreate']) === 'function') {
        forestay.config.forestay.index.beforeCreate(req, res, forestay, function (err, forestay) {
          if (err) return cb(err)
          finish(forestay)
        })
      } else {
        finish(forestay)
      }
      function finish(forestay){
        forestay.model.create(forestay.save).fetch().then(model => {
          forestay.id = model.id
          updateCollectionsAndModels(forestay, collections, models, function (err) {
            if (err) console.log('error!')
            return res.redirect(forestay.config.forestay.urlPrefix)
          })
        })
      }
    }
  },
  deletePost: function (forestay, req, res) {
    forestay.model.destroy({
      id: forestay.id
    }, function (err, saved) {
      if (err) return res.serverError(err)
      res.redirect(forestay.config.forestay.urlPrefix)
    })
  },
  populateView: function (forestay, req, res) {
    // TODO: This should be used for model.meta.forestay.populateUi == "search" - also see createUpdate script at the bottom
    // verify that model is a collection of field.
    /*
     result = {
        availableValues: object,
        selectedValues: object
     }
    */
    res.send('ok')
  }
}

function isPositiveInteger (n) {
  return n >>> 0 === parseFloat(n)
}

function populateOne (forestay, cb) { // populateOne populates a models that specify populateUi: "select" with available and selected values
  var modelName, viaName
  async.eachOfSeries(forestay.config.attributes, function eachAttr (attr, i, cb) {
    if (typeof _.get(forestay.config.attributes[i], ['collection']) === 'string') {
      modelName = _.str.capitalize(_.get(forestay.config.attributes[i], ['collection']))
      viaName = _.get(forestay.config.attributes[i], ['via'])

      global[modelName].find().populate(viaName).exec(function (err, result) {
        if (err) return cb(err)
        forestay.config.attributes[i].availableValues = result
        if (!forestay.id) return cb(null)

        forestay.model.find({id: forestay.id}).populate(i).exec(function (err, record) {
          if (err) return cb(err)
          var m = record[0]
          forestay.config.attributes[i].selectedValues = m[i]
          return cb(null)
        })
      })
    } else if (typeof _.get(forestay.config.attributes[i], ['model']) === 'string') {
      modelName = _.str.capitalize(_.get(forestay.config.attributes[i], ['model']))
      // var viaName = _.get(forestay.config.attributes[i], ['via'])

      global[modelName].find().exec(function (err, r) {
        if (err) return cb(err)
        forestay.config.attributes[i].availableValues = r
        if (forestay.id) {
          forestay.model.find({where: {id: forestay.id}}).populate(_.get(forestay.config.attributes[i], ['model'])).exec(function (err, result) {
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
  }, function endSeries (err) {
    if (err) return cb(err)
    return cb(null, forestay)
  })
}
function updateCollectionsAndModels (forestay, collections, models, cb) {
  updateCollections(forestay, collections, function (err) {
    if (err) return cb(err)
    updateModels(forestay, models, function (err) {
      if (err) return cb(err)
      return cb(null)
    })
  })
}
function updateCollections (forestay, collections, cb) {
  if (collections.length < 1) return cb(null)
  async.eachSeries(collections, function eachCollection (c, cb) {
    var ids = []

    if (typeof _.get(c, 'linkedIds') === 'undefined' || c.linkedIds.length === 0) return cb(null)
    c.linkedIds.forEach(function (thisc) {
      ids.push(parseInt(thisc))
    })
    forestay.model.replaceCollection(forestay.id, c.key).members(ids).then(() => {
      return cb(null)
    })
  }, function eachCollectionDone (err) {
    if (err) return cb(err)
    return cb(null)
  })
}

function updateModels (forestay, models, cb) {
  if (models.length < 1) return cb(null)
  async.eachSeries(models, function eachModel (m, cb) {
    var id
    if (m.linkedId === '' || m.linkedId === null) id = null
    else id = parseInt(m.linkedId) // the id of the model reference
    var save = {
    }
    save[m.key] = id
    forestay.model.update({id: forestay.id}, save, function (err) {
      if (err) return cb(err)
      return cb(null)
    })
  }, function eachModelDone (err) {
    if (err) return cb(err)
    return cb(null)
  })
}
function configureIndexActions (forestay, cb) {
  var route
  if (_.get(forestay.config.forestay, ['actions'])) {
    Object.keys(forestay.config.forestay.actions).forEach(function (actionKey) {
      if (forestay.config.forestay.actions[actionKey].type === 'record') {
        route = new Route(actionKey)
        forestay.records.forEach(function (r, i) {
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
function replaceIndexRowHtmlRows (req, res, forestay, cb) {
  async.eachOfSeries(forestay.records, function eachRecord (row, index, cb) {
    if (typeof _.get(forestay.config, ['forestay', 'index', 'replaceIndexRowHtml']) === 'function') {
      forestay.config.forestay.index.replaceIndexRowHtml(req, res, forestay, row, function (err, forestay, row) {
        if (err) return cb(err)
        forestay.records[index] = row
        return cb(null, forestay)
      })
    } else {
      return cb(null)
    }
  }, function finishEachRecord (err) {
    if (err) return res.serverError(err)
    return cb(forestay)
  })
}
