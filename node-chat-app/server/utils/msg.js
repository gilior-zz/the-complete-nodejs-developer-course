var moment = require('moment');
var genMsg = (from, text) => {
    return {from, text, createdAt: moment().valueOf()}
}

var genLocMsg = (from, lat, long) => {
    return {from, url: `https://www.google.co.il/maps?q=${lat},${long}`, createdAt: moment().valueOf()}
}

module.exports = {genMsg, genLocMsg}