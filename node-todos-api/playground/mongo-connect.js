
const {MongoClient,ObjectID} = require('mongodb');
var obj=new ObjectID();
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoAoo', (err, client) => {
    if (err) console.log('unable 2 connect to mongodb server')
    else {
        console.log('successfuly 2 connect to mongodb server')
        const db = client.db('ToDoApp');
        // db.collection('toDos').insertOne({
        //     text: 'an item',
        //     completed: false
        // }, (err, res) => {
        //     if (err) return console.log('unable 2 insert to do')
        //     console.log(JSON.stringify(res.ops, undefined, 2))
        // })

        // db.collection('users')
        //     .insertOne({name: 'asd', age: 22, location: 'TA'}, (err, res) => {
        //         if (err) return console.log('unable 2 store data in users collection')
        //         console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2))
        //     })
        client.close();
    }
})