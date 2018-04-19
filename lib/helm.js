const util = require('util')
module.exports = {
  router: function(req,res){
    console.log("helm")

    if(typeof _.get(req.options,["helm","model"]) != "string") return res.serverError("HELM ERROR: Please add the associated model to your route.");

    var args = req.url.split('/')
    var lastArg = args[args.length - 1]

    var helm = {
      model : global[req.options.helm.model],
      config : require(process.env.PWD + "/api/models/" + req.options.helm.model ),  // TODO: Maybe there's a better way than process.env.PWD - Or maybe there's a way to get the attributes and meta from somewhere else.  It's not in the model object.  Mike?
    }

    /* route this to the correct CRUD operation */
    if(req.method == "GET"){
      if(isPositiveInteger(lastArg)) return helm_helpers.updateView(helm, req,res);
      if(lastArg == "create") return helm_helpers.createView(helm, req,res);
      else return helm_helpers.index(helm, req,res);
    }
    else if(req.method == "POST"){
      return helm_helpers.createPost(helm, req,res);
    }
    else if(req.method == "PUT"){
      if(isPositiveInteger(lastArg)) return helm_helpers.updatePost(helm, req,res);
    }
    else if(req.method == "DELETE"){
      if(isPositiveInteger(lastArg)) return helm_helpers.deletePost(helm, req,res);
    }
    return res.notFound();
  }
}


var helm_helpers = {
  index: function(helm, req,res){
    helm.model.find({}, function(err, contacts){
      console.log(contacts)

      res.view('helm/index', {helm})
    })
  },
  createView: function(helm,req,res){
    res.send("create view");
  },
  createPost: function(helm,req,res){
    res.send("create post")
  },
  updateView: function(helm,req,res){
    res.send("update view")
  },
  updatePut: function(helm,req,res){
    res.send("update post")
  },
  deletePost: function(helm,req,res){
    res.send("delete post")
  }
}

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}
