var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {ToDo} = require('./model/todo')
var {User} = require('./model/user')

var app = express();

app.use(bodyParser.json());

/*
examples
----------------------
var newToDo = new ToDo(    {text: 4})
var newUsr = new User({email: '1'})

newToDo.save()
    .then((doc) => {
            console.log('saved todo', doc)
        }, (err) => {
            console.log('unable 2 save todo', err)
        }
    )

newUsr.save()
    .then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2))
    }, (err) => {
        console.log('error on save user', err)
    })
*/

app.post('/todos', (req, res) => {
    var todo = new ToDo({text: req.body.text});
    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    ToDo.find({}).then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos/:id')
    .then((req, res) => {
        let id=req.param
    })

app.listen(5000, () => {
    console.log('listening on port 5000')
})

module.exports.app = app

