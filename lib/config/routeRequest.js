var helpers = require("./../helpers/helpers")

var forestayHelpers = {
    index: require("./../controllers/index"),
    createView: require("./../controllers/createView"),
    updateView: require("./../controllers/updateView"),
    createUpdatePost: require("./../controllers/createUpdatePost"),
    deletePost: require("./../controllers/deletePost"),
    populateView: require("./../controllers/populateView"),
    tagAutoComplete: require("./../controllers/tagAutoComplete"),
    getRecordTag: require("./../controllers/getRecordTag")
}

module.exports = function(args, forestay, req, res) {

    if (req.method === 'GET') {
        if (helpers.isPositiveInteger(args[0]) && (args[1] === 'edit')) {
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

        if (helpers.isPositiveInteger(args[0]) && args[1] === 'delete') {
            forestay.id = args[0]
            return forestayHelpers.deletePost(forestay, req, res)

        } else if (helpers.isPositiveInteger(args[0]) && (args[1] === 'edit')) {
            forestay.id = args[0]
            return forestayHelpers.createUpdatePost(forestay, req, res)
        } else if (args[0] === 'create') {
            return forestayHelpers.createUpdatePost(forestay, req, res)
        } else if (args[0] == "tag-auto-complete") {
            forestay.search = args[1]
            return forestayHelpers.tagAutoComplete(forestay, req, res)
        } else if (helpers.isPositiveInteger(args[0]) && args[1] == "get-record-tag") {
            return forestayHelpers.getRecordTag(forestay, req, res)
        } else {
            console.log('post request not caught')
            return res.notFound()
        }
    }
    console.log('request not caught')
    return res.notFound()
}
