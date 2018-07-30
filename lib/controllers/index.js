const path = require('path')
const viewBase = path.join(__dirname, '../..', 'views', 'forestay')
const defaultLayout = viewBase + '/layout.ejs'
var helpers = require("./../helpers/helpers")

module.exports = function(forestay, req, res) {

  var filter = {}
  var criteria = {}
  var modelName, hideInIndex, hideFilter, filterable
  forestay.hasFilters = false

  Object.keys(forestay.config.attributes).forEach(function(attrKey) {
      if (_.get(forestay.config.attributes[attrKey], ['meta', 'forestay', 'filterable']) === true) {
          forestay.hasFilters = true
          if (typeof _.get(req.query, [attrKey]) !== 'undefined' && _.get(req.query, [attrKey]) !== '') {
            filter[attrKey] = req.query[attrKey]
            if (_.get(forestay.config.attributes[attrKey], ['type']) === "string") {
              criteria[attrKey] = {
                'contains': req.query[attrKey]
              }
            } else {
              criteria[attrKey] = req.query[attrKey]
            }
          }
      }
  })
  if (_.get(forestay.config.forestay.index, ['filterLogicalOperator']) === 'or' && Object.keys(filter).length > 0) {
        var f = {
            or: []
        }
        var obj
        Object.keys(filter).forEach(function(filterKey, i) {
            obj = {}
            obj[filterKey] = filter[filterKey]
            f.or.push(obj)
        })
        filter = f
    }
    if (typeof _.get(forestay.config.forestay.index, 'filterOverride') === 'object') {
        filter = forestay.config.forestay.index.filterOverride
    }

    /* filter by available options of model or collections */
    Object.keys(forestay.config.attributes).forEach(function(attrKey) {
        if(_.get(forestay.config.attributes[attrKey], ['model'])) {
          modelName = sails.models[_.get(forestay.config.attributes[attrKey], ['model']).toLowerCase()];
          hideInIndex = _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideInIndex']) ? _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideInIndex']) : false;
          hideFilter = _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideFilter']) ? _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideFilter']) : false;
          filterable = _.get(forestay.config.attributes[attrKey], ['meta','forestay','filterable']) ? _.get(forestay.config.attributes[attrKey], ['meta','forestay','filterable']) : false;

          if(hideInIndex === false && hideFilter === false && filterable === true) {
            forestay.hasFilters = true
            if(_.get(forestay.config.attributes[attrKey], ['meta','forestay','populateBy'])) {
              var populateBy = _.get(forestay.config.attributes[attrKey], ['meta','forestay','populateBy'])
              modelName.find({select: ['id', populateBy]}).exec(function(err, r) {
                if (err) return cb(err)
                forestay.config.attributes[attrKey].availableValues = r
              });
            } else {
              modelName.find().exec(function(err, r) {
                if (err) return cb(err)
                forestay.config.attributes[attrKey].availableValues = r
              });
            }
          }
        } else if(_.get(forestay.config.attributes[attrKey], ['collection'])) {
          // var modelCollectionName = _.get(forestay.config.attributes[attrKey], ['collection']).toLowerCase()
          // modelName = sails.models[modelCollectionName];
          // modelName.find().exec(function(err, r) {
          //   if (err) return cb(err)
          //   forestay.config.attributes[attrKey].availableValues = r
          // });
        }
    })

    forestay.model.count(criteria).exec(function countCB(error, total_records) {
        var number_of_pages = Math.ceil(total_records / forestay.config.forestay.index.itemsPerPage);
        var pg = 1;
        var skip = 0;
        var queryString = "";
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

        if (Object.keys(req.query).length > 0) {
            queryString = '&' + Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
        } else {
            queryString = "";
        }

        forestay.filter = filter
        var sort = "";
        if (_.get(forestay.config.forestay.index, ['defaultSort', 'attribute'])) {
            var sort_method = "ASC";
            if (_.get(forestay.config.forestay.index, ['defaultSort', 'method'])) {
                sort_method = forestay.config.forestay.index.defaultSort.method
            }
            sort = forestay.config.forestay.index.defaultSort.attribute + " " + sort_method;
        }

        var query = forestay.model.find(criteria).limit(forestay.config.forestay.index.itemsPerPage);
        if (skip > 0) {
            query.skip(skip);
        }
        if (sort != "") {
            query.sort(sort);
        }


        Object.keys(forestay.config.attributes).forEach(function(attrKey) {
          if(_.get(forestay.config.attributes[attrKey], ['model']) || _.get(forestay.config.attributes[attrKey], ['collection'])) {
            hideInIndex = _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideInIndex']) ? _.get(forestay.config.attributes[attrKey], ['meta','forestay','hideInIndex']) : false;
            if(hideInIndex === false) {
              if(_.get(forestay.config.attributes[attrKey], ['model'])) {
                query.populate(attrKey);
              } else if(_.get(forestay.config.attributes[attrKey], ['collection'])) {
                query.populate(attrKey,{limit:10});
              }
            }
          }
        })

        query.exec(function(err, records) {
            if (err) return res.serverError(err)
            var moment = require('moment')
            forestay.records = records
            helpers.replaceIndexRowHtmlRows(req, res, forestay, function(forestay) {
                helpers.configureIndexActions(forestay, function(forestay) {
                    if (typeof _.get(forestay.config.forestay, ['index', 'beforeRender']) === 'function') {
                        forestay.config.forestay.index.beforeRender(req, res, forestay, function(err, forestay) {
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
}
