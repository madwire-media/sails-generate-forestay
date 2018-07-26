module.exports = function(forestay, req, res) {
    forestay.model.destroy({
        id: forestay.id
    }, function(err, saved) {
        if (err) return res.serverError(err)
        res.redirect(forestay.config.forestay.urlPrefix)
    })
}
