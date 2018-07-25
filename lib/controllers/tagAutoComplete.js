module.exports = function(forestay, req, res) {
    var search = {}
    if (req.body.type == 'exact') search[req.body.populateBy] = req.body.search
    else search[req.body.populateBy] = {
        startsWith: req.body.search
    }
    forestay.model.find(search).limit(10).exec(function(err, records) {
        if (err) return res.serverError(err)
        res.json(records)
  })
}
