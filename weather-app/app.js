const yargs = require('yargs')
const API_KEY = 'AIzaSyCXK5kR6IY9WV5Ep6g8jtOrj7arvDKhtLc'
const FORCAST_KEY = 'e6b2a5bd5937a84d0d5ff2d59f3c2915'
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const request = require('request')
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'addressfor weaher',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
geocode.geoCodeAddress(argv.a, API_KEY, (err, res) => {
    if (err) console.log(err)
    else weather.weather(res.lng, res.lat, FORCAST_KEY, (resWthr, errWthr) => {
        if (errWthr) console.log(errWthr)
        else
            console.log(`its currently ${resWthr.temperature} but feels like ${resWthr.apparentTemperature}`)
    })
})

