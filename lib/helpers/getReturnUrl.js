module.exports = function getReturnUrl(forestay, cb){
  var returnUrl = forestay.config.forestay.urlPrefix
  if (typeof _.get(forestay,['config','forestay','createUpdateReturnUrl']) === "string"){
    route = new Route(forestay.config.forestay.createUpdateReturnUrl)
    returnUrl = route.reverse(forestay.saved)
    if(returnUrl === false){
      console.log("could not parse route", forestay.config.forestay.createUpdateReturnUrl)
      reuturnUrl = forestay.config.forestay.createUpdateReturnUrl
    }
  }
  return returnUrl
}
