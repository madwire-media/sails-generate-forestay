module.exports = function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n) || n.toString().match(/[0-9a-fA-F]{24}/)
}
