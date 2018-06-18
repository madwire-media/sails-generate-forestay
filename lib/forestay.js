const path = require('path')
const viewBase = path.join(__dirname, '..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'
const _ = require('lodash')
const xss = require('xss')
const colors = require('colors')
const async = require('async')
const Route = require('route-parser')
const htmlSanitize = require('sanitize-html')

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
      routes: require(configPaths.routes).routes,

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
    if (args[0] === '') args[0] = 'index'
    forestay.args = args
    forestay.query = req.query

    if(typeof _.get(forestay.config,['forestay','beforeRoute']) === 'function') {
      forestay.config.forestay.beforeRoute(req, res, forestay, function(err, forestay){
        if(err) return res.serverError(err)

        routeRequest(args, forestay, req, res)
      })
    } else {
      routeRequest(args, forestay, req, res)
    }

    /* route this to the correct CRUD operation */

  }
}

var routeRequest = function (args, forestay, req, res){

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
    } else if (args[0] === 'index') {
      return forestayHelpers.index(forestay, req, res)
    } else {
      console.log('get request not caught')
      return res.notFound()
    }
  } else if (req.method === 'POST') {

    if (isPositiveInteger(args[0]) && args[1] === 'delete') {
      forestay.id = args[0]
      return forestayHelpers.deletePost(forestay, req, res)

    } else if (isPositiveInteger(args[0]) && (args[1] === 'edit')) {
      forestay.id = args[0]
      return forestayHelpers.createUpdatePost(forestay, req, res)
    } else if (args[0] === 'create'){
      return forestayHelpers.createUpdatePost(forestay, req, res)
    } else if (args[0]=="tag-auto-complete"){
      forestay.search = args[1]
      return forestayHelpers.tagAutoComplete(forestay, req, res)
    } else if (isPositiveInteger(args[0]) && args[1]=="get-record-tag"){
      return forestayHelpers.getRecordTag(forestay, req,res)
    } else {
      console.log('post request not caught')
      return res.notFound()
    }
  }
  console.log('request not caught')
  return res.notFound()
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
    if (_.get(forestay.config.forestay.index, ['filterLogicalOperator']) === 'or' && Object.keys(filter).length > 0) {
      var f = {or: []}
      var obj
      Object.keys(filter).forEach(function (filterKey, i) {
        obj = {}
        obj[filterKey] = filter[filterKey]
        f.or.push(obj)
      })
      filter = f
    }
    if (typeof _.get(forestay.config.forestay.index, 'filterOverride') === 'object') {
      filter = forestay.config.forestay.index.filterOverride
    }


    forestay.model.count(filter).exec(function countCB(error, total_records) {
    var number_of_pages = Math.ceil(total_records / forestay.config.forestay.index.itemsPerPage);
    var pg = 1; var skip = 0; var queryString = "";
    if (req.query.pg && !isNaN(req.query.pg) && req.query.pg > 0) {
        pg = req.query.pg;
        if (pg > number_of_pages) {
            pg = 1;
        } else if (pg <= number_of_pages) {
            var skip = 0;
            skip = (pg - 1) * forestay.config.forestay.index.itemsPerPage;
        }
        delete req.query.pg
      }

    if(Object.keys(req.query).length > 0){
      queryString = '&'+Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
    } else {
      queryString = "";
    }

    forestay.filter = filter

    forestay.model.find(filter).limit(forestay.config.forestay.index.itemsPerPage).skip(skip).exec(function(err, records) {
      if (err) return res.serverError(err)
      var moment = require('moment')
      forestay.records = records
      replaceIndexRowHtmlRows(req, res, forestay, function (forestay) {
        configureIndexActions(forestay, function (forestay) {
          if (typeof _.get(forestay.config.forestay, ['index', 'beforeRender']) === 'function') {
            forestay.config.forestay.index.beforeRender(req, res, forestay, function (err, forestay) {
              if (err) return res.serverError(err)
              res.view(viewBase + '/index.ejs', {
                layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
                forestay,
                moment,
                total_records,
                number_of_pages,
                pg,
                queryString
              })
            })
          } else {
            res.view(viewBase + '/index.ejs', {
              layout: _.get(forestay.localConfig, ['defaultLayout']) || defaultLayout,
              forestay,
              moment,
              total_records,
              number_of_pages,
              pg,
              queryString
            })
          }
        })
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
    },
    createUpdatePost: function(forestay, req, res) {
        var save = {}
        var collections = []
        var models = []
        var newCollections = []
        console.log('req_>>>', req.body)



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
        console.log("--->save--->",save)
        if (forestay.id) { // update
            forestay.save = save


            if (typeof _.get(forestay.config, ['forestay', 'beforeUpdate']) === 'function') {
                forestay.config.forestay.beforeUpdate(req, res, forestay, function(err, forestay) {
                    console.log('after before update')
                    return finishUpdate(forestay)
                })
            }
            else {
              finishUpdate(forestay)
            }

        } else { // create
            forestay.save = save
            if (typeof _.get(forestay.config, ['forestay', 'beforeCreate']) === 'function') {
                forestay.config.forestay.beforeCreate(req, res, forestay, function(err, forestay) {
                    console.log('after before create')
                    if (err) return res.serverError(err)
                    finishCreate(forestay)
                })
            } else {
                finishCreate(forestay)
            }
        }
        function finishUpdate(forestay){
          forestay.model.update({
              id: forestay.id
          }, save, function(err, saved) {
              if (err) return res.serverError(err)
              updateCollectionsAndModels(forestay, collections, newCollections, models, function(err) {
                  if (err) console.log('error!', err)
                  console.log('updated collections and models')
                  return res.redirect(forestay.config.forestay.urlPrefix)
              })
          })
        }

        function finishCreate(forestay) {
            forestay.model.create(forestay.save).fetch().then(model => {
                forestay.id = model.id
                console.log('collection and model update')
                updateCollectionsAndModels(forestay, collections, newCollections, models, function(err) {
                    if (err) console.log('error!')

      forestay.model.update({
        id: forestay.id
      }, save, function (err, saved) {
        if (err) return res.serverError(err)
        updateCollectionsAndModels(forestay, collections,newCollections, models, function (err) {
          if (err) console.log('error!', err)
          console.log('updated collections and models')
          return res.redirect(forestay.config.forestay.urlPrefix)
        })
      })
    } else { // create
      forestay.save = save
      if (typeof _.get(forestay.config, ['forestay', 'index', 'beforeCreate']) === 'function') {
        forestay.config.forestay.index.beforeCreate(req, res, forestay, function (err, forestay) {
          console.log('after before create')
          if (err) return res.serverError(err)
          finish(forestay)
        })
      } else {
        finish(forestay)
      }
    }
    function finish (forestay) {
      forestay.model.create(forestay.save).fetch().then(model => {
        forestay.id = model.id
        console.log('collection and model update')
        updateCollectionsAndModels(forestay, collections,newCollections, models, function (err) {
          if (err) console.log('error!')

          return res.redirect(forestay.config.forestay.urlPrefix)
        })
      })
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
  },
  tagAutoComplete: function(forestay,req,res){
    var search = {}
    if(req.body.type == 'exact') search[req.body.populateBy] = req.body.search
    else search[req.body.populateBy] = { startsWith: req.body.search }
    forestay.model.find(search).limit(10).exec(function (err, records) {
      if(err) return res.serverError(err)
      res.json(records)
    })
  },
  getRecordTag: function(forestay, req, res){


    if(typeof _.get(forestay.config.attributes,[forestay.args[2],'collection']) == "undefined") return res.notFound()
    var pop= forestay.args[2]

    forestay.model.find({id:forestay.args[0]}).populate(pop).limit(1).exec(function(err,r){
        if(err) return res.serverError(err)
        if(!r) return res.notFound()
        var a = r[0]

        res.json(a[pop])
    })

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
function updateCollectionsAndModels (forestay, collections,newCollections, models, cb) {

  addNewCollections(forestay,newCollections, function(err, newIds){

    if (err) return cb(err)
    // add linkedids
    collections.forEach(function(c,k){
      if(typeof _.get(newIds,c.key) != "undefined" && _.get(newIds,c.key).length > 0){

        newIds[c.key].forEach(function(id){
          collections[k].linkedIds.push(id)
        })
        //collections[k].linkedIds.concat(newIds[c.key])

      }

    })

    updateCollections(forestay, collections, function (err) {
      if (err) return cb(err)
      updateModels(forestay, models, function (err) {
        if (err) return cb(err)
        return cb(null)
      })
    })
  })

}


function addNewCollections(forestay, newCollections, cb){

  var newIds = {}

  if(newCollections.length < 1) return cb(null, null)
  async.eachOfSeries(newCollections, function(nc, key, cb){

    if(_.get(forestay.config.attributes,[nc.key,'meta','forestay','allowAddition']) !== true) return cb(null)
    var model = _.get(forestay.config.attributes, [nc.key,'collection'])

    model = capitalizeFirstLetter(model)

    async.eachSeries(nc.records, function eachItem(r, cb){

      var save = {}
      var populateBy = _.get(forestay.config.attributes,[nc.key,'meta','forestay','populateBy'])
      save[populateBy] = htmlSanitize(r[populateBy], {allowedTags: [],allowedAttributes: []})

      global[model].create(save).fetch().exec(function(err,record){

        if(err) return cb(err)
        if(typeof newIds[nc.key] == "undefined") newIds[nc.key] = []
        newIds[nc.key].push(record.id)

        return cb(null)
      })
    }, function doneEachItem(err){

        return cb(null)
    })
  },
  function endEachNewCollection(err){
    if(err) return cb(err)
    return cb(null,newIds)
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

<<<<<<< HEAD
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
=======
function updateModels(forestay, models, cb) {
    if (models.length < 1) return cb(null)
    async.eachSeries(models, function eachModel(m, cb) {
        var id
        console.log(">>>>", m.linkedId)
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
>>>>>>> beforeUpdateCallback
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
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
