require('./config/config')
const {authenticate} = require('./middlware/authrnticate')
var express = require('express')
var bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose')
var {ToDo} = require('./model/todo')
var {User} = require('./model/user')
const _ = require('lodash')


var port = process.env.PORT
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

app.post('/todos', authenticate, (req, res) => {
    var todo = new ToDo({text: req.body.text, _creator: req.user._id});
    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', authenticate, (req, res) => {
    ToDo.find({_creator: req.user._id}).then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!id || !ObjectID.isValid(id)) res.status(404).send({msg: 'id not valid', id})
    ToDo.findOne({_id: id, _creator: req.user._id}).then((todo) => {
        res.send({todo})
    }, (err) => {
        res.status(404).send(err)
    })
})

app.delete('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!id || !ObjectID.isValid(id)) res.status(404).send({msg: 'id not valid', id})

    // ToDo.findByIdAndRemove(id)
    ToDo.findOneAndRemove({_id: id, _creator: req.user._id})
        .then((doc) => {
            if (!doc) return res.status(404).send({msg: 'todo not found', id})
            res.status(200).send(doc)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})


app.patch('/todos/:id',authenticate ,(req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) return res.status(404).send({msg: 'invalid id', id})
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    // ToDo.findByIdAndUpdate(id, {$set: body}, {new: true})
    ToDo.findByOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true})
        .then((updatedToDo) => {
                if (!updatedToDo) res.status(404).send({msg: 'todo not found', id})
                res.status(200).send({updatedToDo})
            }
        )
        .catch((err) => res.status(404).send({msg: 'update failed', err}))
})

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'pwd'])
    var newUsr = new User(body);
    newUsr.save()
        .then(() => {
            return newUsr.generateAuthToken();
            // if (newUser) return res.status(200).send(newUser)
            // return res.status(500).send({msg: 'couldnt save user'}, newUser)
        })
        .then((token) => {
            console.log('token', token)
            res.header('x-auth', token).send(newUsr)
        })
        .catch((err) => res.status(500).send({msg: 'couldnt save user'}, err))
})

app.post('/users/login', (req, res) => {
    var {email, pwd} = _.pick(req.body, ['email', 'pwd'])
    User.findByCredentials(email, pwd)
        .then((user) => {
            return user.generateAuthToken()
                .then((token) => {
                    res.header('x-auth', token).send(user);
                })
        })
        .catch((err) => res.status(401).send(err));
})


app.get('/users', (req, res) => {
    User.find({})
        .then((users) => res.status(200).send({users}))
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => res.send())
        .catch((err) => res.status(500).send(err))
})


app.listen(port, () => {
    console.log('listening on port' + port)
})

module.exports.app = app

