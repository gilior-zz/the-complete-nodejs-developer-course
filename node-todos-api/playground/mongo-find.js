const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoAoo', (err, client) => {
    if (err) console.log('unable 2 connect to mongodb server')
    else {
        console.log('successfuly 2 connect to mongodb server')
        const db = client.db('ToDoApp');
        // db.collection('toDos').find().count()
        //     .then((res) => {
        //     console.log('oDos')
        //         console.log(JSON.stringify(res, undefined, 2))
        //     }, (err) => {
        //         console.log('unable 2 fetch ToDos data', err)
        //     })

        db.collection('users')
            .find()
            .toArray().then((res) => {
            console.log(JSON.stringify(res, undefined, 2))
        })


        // client.close();
    }
})