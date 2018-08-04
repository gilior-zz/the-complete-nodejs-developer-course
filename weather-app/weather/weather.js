const request = require('request')
var weather = (lang, lat, forcast_key, callback) => {
    // let url = `https://api.darksky.net/forecast/${FORCAST_KEY}/37.8267,-122.4233?units=si`
    let url = `https://api.darksky.net/forecast/${forcast_key}/${lat},${lang}?units=si`
    let obj = {url, json: true}
    request(obj, (err, res, body) => {
        if (err) callback(undefined, 'unable 2 connect to forcast servers')
        else if (res.statusCode === 400) callback(undefined, res.error)
        else callback({
                temperature:body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature,
        })
    })
}

module.exports = {weather}