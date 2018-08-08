var port = process.env.Port || 3000
const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    res.render('meintanence.hbs')

})
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n')
    console.log(log)
    next()
})


hbs.registerHelper('getCuurentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'home page',
        wlcmMsg: 'welcome 2 my site'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page'

    })
})

app.listen(port, () => {
    console.log('server is listening on port ' + port)
})