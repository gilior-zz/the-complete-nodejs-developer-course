const request = require('request')
var geoCodeAddress = (address, api_key, callback) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api_key}`;
    request.get(
        {
            // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=39328%20lwekjf%20ljewf%20klej%20f',
            url: url,
            json: true
        }
        , (err, res, body) => {

            if (err) callback('unable 2 connect 2 google servers')
            else if (body.status === 'ZERO_RESULTS') callback('invalid address')
            else {
                let res = {
                    formatted_address: body.results[0].formatted_address,
                    lng: body.results[0].geometry.location.lng,
                    lat: body.results[0].geometry.location.lat,
                    address: body.results[0].geometry.location, address,
                }
                callback(undefined, res)
            }

        })
}

module.exports = {geoCodeAddress}