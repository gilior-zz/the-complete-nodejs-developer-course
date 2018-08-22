const path = require('path')
var express = require('express')
const socketIo = require('socket.io')
const {isRealString} = require('./utils/validation')
const http = require('http')
const {genMsg, genLocMsg} = require('./utils/msg')
const {Users} = require('./utils/users')
var app = express();
var server = http.createServer(app)
var io = socketIo(server);
var users = new Users();
app.use(express.static(path.join(__dirname, '../public')));
io.on('connection', (socket) => {
    console.log('new ust connected')

    socket.on('disconnect', () => {
        // console.log('disconnect from server')
        let user = users.removeUser(socket.id)
        console.log(user)
        if (user) {

            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
            io.to(user.room).emit('newMsg', genMsg('Admin', `${user.name} has left d building`));
        }
    })

    socket.on('createMsg', (newMsg, callback) => {
        // console.log('createEmail',newEmail)
        var user = users.getUser(socket.id);
        var {text} = newMsg;
        if (user && isRealString(text)) {
            io.to(user.room).emit('newMsg', genMsg(user.name, text))
            callback('this is from server');
        }
        else {

        }

        // io.emit('newMsg', {
        //     from, text, createdAt: 123
        // })
    })

    socket.on('locMsgToServer', function (coords, callback) {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocMsgToClient', genLocMsg(user.name, coords.lat, coords.long))
            callback('coords accepted');
        }

    })

    socket.on('join_server', (params, callback) => {
        if (!isRealString(params.name) ||
            !isRealString(params.room))
            callback('bad string')
        else {
            callback()
            socket.join(params.room)
            users.removeUser(socket.id)
            users.addUser(socket.id, params.name, params.room)

            io.to(params.room).emit('updateUsersList', users.getUsersList(params.room))
            socket.emit('newMsg', genMsg('admin', 'wlcm 2 chat'))
            socket.broadcast.to(params.room).emit('newMsg', genMsg('admin', `${params.name} arrived`))
        }
    })

})

app.get('/', (req, res) => {
    res.render('index.html')
})

var port = process.env.PORT || 1000;

server.listen(port, () => {
    console.log('listening on port ' + port)
})