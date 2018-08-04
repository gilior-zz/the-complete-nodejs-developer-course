const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoAoo', (err, client) => {
    if (err) console.log('unable 2 connect to mongodb server')
    else {
        console.log('successfuly 2 connect to mongodb server')
        const db = client.db('ToDoApp');
        db.collection('toDos').deleteMany({text: 'live the life'})
            .then((res)=>{
            console.log(res)
            })


        // client.close();
    }
})