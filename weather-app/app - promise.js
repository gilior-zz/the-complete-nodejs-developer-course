const yargs = require('yargs')
const axios = require('axios')
const API_KEY = 'AIzaSyCXK5kR6IY9WV5Ep6g8jtOrj7arvDKhtLc'
const FORCAST_KEY = 'e6b2a5bd5937a84d0d5ff2d59f3c2915'
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const request = require('request')
const argv = yargs
    .options({
        a: {

            alias: 'address',
            describe: 'addressfor weaher',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.a||'tel aviv')}&key=${API_KEY}`;
axios.get(url)
    .then((res) => {
        if (res.data.status === 'ZERO_RESULTS') throw new Error('unable 2 find ur address')
        var lng = res.data.results[0].geometry.location.lng;
        var lat = res.data.results[0].geometry.location.lat;
        var formatted_address = res.data.results[0].formatted_address;
        console.log(formatted_address)
        let weatherUrl = `https://api.darksky.net/forecast/${FORCAST_KEY}/${lat},${lng}?units=si`
        let obj = {url, json: true}
        return axios.get(weatherUrl)

    })
    .then((res) => {
        var temperature = res.data.currently.temperature;
        var apparentTemperature = res.data.currently.apparentTemperature;
        console.log(`its currently ${temperature} but feels like ${apparentTemperature}`)
    })
    .catch(err => {
        if (err.code === 'ENOTFOUND') console.log('unable 2 connect to api server')
        else console.log(err.message)
    })