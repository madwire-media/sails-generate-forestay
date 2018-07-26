module.exports = function(forestay, req, res) {

    if (typeof _.get(forestay.config.attributes, [forestay.args[2], 'collection']) == "undefined") return res.notFound()
    var pop = forestay.args[2]
    forestay.model.find({
        id: forestay.args[0]
    }).populate(pop).limit(1).exec(function(err, r) {
        if (err) return res.serverError(err)
        if (!r) return res.notFound()
        var a = r[0]
        res.json(a[pop])
    })
}
