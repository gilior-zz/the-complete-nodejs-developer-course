const {mongoose} = require('../server/db/mongoose')
const {ToDo} = require('../server/model/todo')
const {User} = require('../server/model/user')
const {ObjectID} = require('mongodb')
// const id = '5b6954415ab83b353ca07316';
const userId = '5b66b3456e842c3f14cc0862';


// if (!ObjectID.isValid(id)) {
//     console.log('id not valid')
// }
//
// ToDo.find({_id: id})
//     .then((todos) => {
//         console.log('todos',todos)
//     },(err)=>{console.log(err)})
//
// ToDo.findOne({_id: id})
//     .then((todo) => {
//         console.log('todo',todo)
//     },(err)=>{console.log(err)})

// ToDo.findById(id).then((todo) => {
//     if (!todo) console.log('id not found')
//     console.log('findById', todo)
// }, (err) => {
//     console.log(err)
// })

User.findById(userId)
    .then(user => {
        if (!user) return console.log('user not found')
        console.log('User.findById',JSON.stringify(user,undefined,2) )
    })
    .catch((err) => {
        if (!ObjectID.isValid(userId)) return console.log('id not valid')
        console.log('unknown error', err)

    })
