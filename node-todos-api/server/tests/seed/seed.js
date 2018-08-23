const {ObjectID} = require('mongodb');


const {ToDo} = require('../../model/todo');
const {User} = require('../../model/user');
const jwt = require('jsonwebtoken')
const user1ID = new ObjectID();
const user2ID = new ObjectID();
const todos = [
    {text: '1st task', _id: new ObjectID(), _creator: user1ID},
    {text: '2nd task', _id: new ObjectID(), completed: true, completedAt: 33, _creator: user2ID},
]

let secret = process.env.JWT_SECRET;
var user1Obj = {
    user2ID, secret
}
var user2Obj = {
    user1ID, secret
}
var user1Token = jwt.sign(user1Obj, process.env.JWT_SECRET).toString();
var user2Token = jwt.sign(user2Obj, process.env.JWT_SECRET).toString();
const users = [
    {
        _id: user1ID,
        email: "a@a.com",
        pwd: 'user1Pass',
        tokens: [
            {
                access: 'auth', token: user1Token
            }
        ]
    }, {
        _id: user2ID,
        email: "b@b.com",
        pwd: 'user2Pass',
        tokens: [
            {
                access: 'auth', token: user2Token
            }
        ]
    }

]


const genToDos = (done) => {
    ToDo.remove({}).then(() => {
        return ToDo.insertMany(todos)
            .then(() => done())
    });
};

const genUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1, user2]);
    })
        .then(() => done());
};

module.exports = {genToDos, todos, users, genUsers}