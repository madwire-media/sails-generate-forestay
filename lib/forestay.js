const path = require('path')
const viewBase = path.join(__dirname, '..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'

module.exports = {
  router: function (req, res) {
    if (typeof _.get(req.options, ['forestay', 'model']) !== 'string') return res.serverError('forestay ERROR: Please add the associated model to your route.')

    // build forestay object
    var forestay = {
      model: global[req.options.forestay.model],
      config: require(process.env.PWD + '/api/models/' + req.options.forestay.model) // TODO: Maybe there's a better way than process.env.PWD - Or maybe there's a way to get the attributes and meta from somewhere else.  It's not in the model object.  Mike?
    }

    // set the name
    forestay.model.name = req.options.forestay.model

    // parse args
    if (!req.url.startsWith(forestay.config.forestay.urlPrefix)) {
      console.log("forestay ERROR: The model.forestay.urlPrefix isn't at the beginning of the URL.  Likely a configuration error")
      return res.notFound()
    }

    var trimmedUrl = req.url.substring(forestay.config.forestay.urlPrefix.length)
    var args = trimmedUrl.split('?')[0].split('?')[0].split('/')

    /* route this to the correct CRUD operation */
    if (req.method === 'GET') {
      if (isPositiveInteger(args[0]) && (args[1] === 'edit')) {
        forestay.id = args[0]
        return forestayHelpers.updateView(forestay, req, res)
      } else if (args[0] === 'create') return forestayHelpers.createView(forestay, req, res)
      else if (args[0] === '') return forestayHelpers.index(forestay, req, res)
      else return res.notFound()
    } else if (req.method === 'POST') {
      if (isPositiveInteger(args[0]) && args[1] === 'delete') {
        forestay.id = args[0]
        return forestayHelpers.deletePost(forestay, req, res)
      } else if (isPositiveInteger(args[0]) && (args[1] === 'edit')) {
        forestay.id = args[0]
        return forestayHelpers.updatePost(forestay, req, res)
      } else if (args[0] === 'create') return forestayHelpers.createPost(forestay, req, res)
      else return res.notFound()
    }

    return res.notFound()
  }
}

var forestayHelpers = {
  index: function (forestay, req, res) {
    forestay.model.find({}, function (err, records) {
      if (err) return res.serverError(err)
      var moment = require('moment')
      forestay.records = records
      res.view(viewBase + '/index.ejs', {
        layout: defaultLayout,
        forestay,
        moment
      })
    })
  },
  createView: function (forestay, req, res) {
    res.view(viewBase + '/createUpdate.ejs', {
      layout: defaultLayout,
      forestay
    })
  },
  createPost: function (forestay, req, res) {
    var save = {}
    Object.keys(forestay.config.attributes).forEach(function (attrKey) {
      if (typeof _.get(req.body, attrKey) === 'string') {
        save[attrKey] = req.body[attrKey]
      }
    })

    forestay.model.create(save, function (err, saved) {
      if (err) return res.serverError(err)
      res.redirect(forestay.config.forestay.urlPrefix)
    })
  },
  updateView: function (forestay, req, res) {
    forestay.model.find({
      id: forestay.id
    }).limit(1).exec(function (err, record) {
      if (err) res.serverError(err)
      if (record.length === 0) return res.send('record not found')
      record = record[0]
      res.view(viewBase + '/createUpdate.ejs', {
        layout: defaultLayout,
        forestay,
        record
      })
    })
  },
  updatePost: function (forestay, req, res) {
    var save = {}
    Object.keys(forestay.config.attributes).forEach(function (attrKey) {
      if (typeof _.get(req.body, attrKey) === 'string') {
        save[attrKey] = req.body[attrKey]
      }
    })
    forestay.model.update({
      id: forestay.id
    }, save, function (err, saved) {
      if (err) return res.serverError(err)
      res.redirect(forestay.config.forestay.urlPrefix)
    })
  },
  deletePost: function (forestay, req, res) {
    forestay.model.destroy({
      id: forestay.id
    }, function (err, saved) {
      if (err) return res.serverError(err)
      res.redirect(forestay.config.forestay.urlPrefix)
    })
  }
}

function isPositiveInteger (n) {
  return n >>> 0 === parseFloat(n)
}
