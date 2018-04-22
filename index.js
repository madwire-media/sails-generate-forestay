/**
 * Module dependencies
 */

const util = require('util')
const path = require('path')
const _ = require('lodash')
_.str = require('underscore.string')
const colors = require('colors')

/**
 * sails-generate-forestay
 *
 * Usage:
 * `sails generate forestay (modelname)`
 *
 * @description Generates a forestay.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 */

module.exports = {
  forestay: require('./lib/forestay.js'),

  before: function (scope, done) {
    if (_.isUndefined(scope.args[0])) {
      return done(new Error('Please provide a name for this forestay.'))
    }
    if (!_.isString(scope.args[0])) {
      return done(new Error('Expected a string for `scope.args[0]`, but instead got: ' + util.inspect(scope.args[0], {
        depth: null
      })))
    }
    console.log("hi")
    var globalID = _.str.capitalize(scope.args[0])
    scope.controllerfile = globalID + 'Controller.js'
    scope.modelfile = globalID + '.js'
    console.log('Creating ' + scope.controllerfile.blue + ' controller and ' + scope.modelfile.blue + ' model')

    scope.upperForestay = globalID
    scope.lowerForestay = globalID.toLowerCase()

    return done()
  },
  after: function (scope, done) {
    console.log('That\'s done!')
    console.log('You\'ll want to add the following code to the '.red + 'config/routes.js'.yellow + ' file.'.red)
    console.log(`
"/${scope.lowerForestay}/*": {
  controller: "${scope.lowerForestay}",
  action: "forestay",
  forestay:{
    model:"${scope.upperForestay}",
  }
},
      `.blue)
    return done()
  },

  targets: {
    './api/controllers/:controllerfile': {
      template: 'api/controller.js'
    },
    './api/models/:modelfile': {
      template: 'api/model.js'
    }
  },

  templatesDirectory: path.resolve(__dirname, './templates')

}
