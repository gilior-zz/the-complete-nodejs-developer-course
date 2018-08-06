const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp');


var ToDo = mongoose.model('ToDo', {
    text: {type: String, required: true, minLength: 1, trim: true},
    completed: {type: Boolean, default: false},
    completedAt: {type: Number, default: null},
});

var User = mongoose.model('User', {
    email: {type: String, required: true, minLength: 1, trim: true}
});

var newToDo = new ToDo(
    {text: 4}
)

var newUsr = new User({email: '1'})

// newToDo.save()
//     .then((doc) => {
//             console.log('saved todo', doc)
//         }, (err) => {
//             console.log('unable 2 save todo', err)
//         }
//     )

newUsr.save()
    .then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2))
    }, (err) => {
        console.log('error on save user', err)
    })

