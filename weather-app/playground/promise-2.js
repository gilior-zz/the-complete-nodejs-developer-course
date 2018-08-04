const request = require('request');
const API_KEY = 'AIzaSyCXK5kR6IY9WV5Ep6g8jtOrj7arvDKhtLc'
var geocode = (address, api_key) => {
    return new Promise((resolve, rej) => {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api_key}`;
        request.get(
            {
                // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=39328%20lwekjf%20ljewf%20klej%20f',
                url: url,
                json: true
            }
            , (err, res, body) => {

                if (err) rej('unable 2 connect 2 google servers')
                else if (body.status === 'ZERO_RESULTS') rej('invalid address')
                else {
                    let res = {
                        formatted_address: body.results[0].formatted_address,
                        lng: body.results[0].geometry.location.lng,
                        lat: body.results[0].geometry.location.lat,
                        address: body.results[0].geometry.location, address,
                    }
                    resolve(res)
                }

            })
    })
}

geocode('oxford', API_KEY)
    .then(location => console.log(JSON.stringify(location, undefined, 2)))
    .catch(err => console.log(err))