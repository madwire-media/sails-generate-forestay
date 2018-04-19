const util = require('util')
module.exports = {
  router: function(req,res){


    if(typeof _.get(req.options,["helm","model"]) != "string") return res.serverError("HELM ERROR: Please add the associated model to your route.");

    // build helm object
    var helm = {
      model : global[req.options.helm.model],
      config : require(process.env.PWD + "/api/models/" + req.options.helm.model ),  // TODO: Maybe there's a better way than process.env.PWD - Or maybe there's a way to get the attributes and meta from somewhere else.  It's not in the model object.  Mike?
    }

    // set the name
    helm.model.name = req.options.helm.model


    // parse args
    if(!req.url.startsWith(helm.config.helm.urlPrefix)) {
      console.log("HELM ERROR: The model.helm.urlPrefix isn't at the beginning of the URL.  Likely a configuration error")
      return res.notFound()
    }

    var trimmedUrl = req.url.substring(helm.config.helm.urlPrefix.length);
    var args = trimmedUrl.split("?")[0].split("#")[0].split('/')

    /* route this to the correct CRUD operation */
    if(req.method == "GET"){
      if(isPositiveInteger(args[0]) && (args[1] == "edit")){
        helm.id = args[0]
        return helm_helpers.updateView(helm, req,res);
      }
      else if(args[0] == "create") return helm_helpers.createView(helm, req,res);
      else if(args[0] == "") return helm_helpers.index(helm, req,res);
      else return res.notFound()
    }
    else if(req.method == "POST"){
      if(isPositiveInteger(args[0]) && args[1] == "delete") {
        helm.id = args[0];
        return helm_helpers.deletePost(helm, req,res);
      }
      else if(isPositiveInteger(args[0]) && (args[1] == "edit")){
        helm.id = args[0];
        return helm_helpers.updatePost(helm, req,res);
      }
      else if(args[0] == "create")   return helm_helpers.createPost(helm, req,res);
      else return res.notFound();
    }

    return res.notFound();
  }
}


var helm_helpers = {
  index: function(helm, req,res){
    helm.model.find({}, function(err, records){
      if(err) return res.serverError(err);
      var moment = require('moment');
      helm.records = records;
      res.view('helm/index', {helm, moment})
    })
  },
  createView: function(helm,req,res){
    res.view('helm/createUpdate', {helm})
  },
  createPost: function(helm,req,res){
    var save = {}
    Object.keys(helm.config.attributes).forEach(function(attrKey){
      if(typeof _.get(req.body,attrKey)=="string"){
        save[attrKey] = req.body[attrKey]
      }
    })

    helm.model.create(save,function(err,saved){
        if(err) return res.serverError(err);
        res.redirect(helm.config.helm.urlPrefix)
    })
  },
  updateView: function(helm,req,res){
    helm.model.find({id: helm.id}).limit(1).exec(function(err, record){
      if(err) res.serverError(err);
      if(record.length == 0) return res.send("record not found")
      record = record[0]
      res.view('helm/createUpdate', {helm, record})

    })

  },
  updatePost: function(helm,req,res){
    var save = {}
    Object.keys(helm.config.attributes).forEach(function(attrKey){
      if(typeof _.get(req.body,attrKey)=="string"){
        save[attrKey] = req.body[attrKey]
      }
    })
    helm.model.update({id: helm.id}, save,function(err,saved){
        if(err) return res.serverError(err);
        res.redirect(helm.config.helm.urlPrefix)
    })
  },
  deletePost: function(helm,req,res){
    helm.model.destroy({id: helm.id},function(err,saved){
        if(err) return res.serverError(err);
        res.redirect(helm.config.helm.urlPrefix)
    })
  }
}

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}
