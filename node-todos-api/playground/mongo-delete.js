const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAoo', (err, client) => {
    if (err) console.log('unable 2 connect to mongodb server')
    else {
        console.log('successfuly 2 connect to mongodb server')
        const db = client.db('ToDoApp');
        db.collection('users')
            .deleteMany({age: 22})
            .then((res) => {
                console.log(JSON.stringify(res, undefined, 2))
            })


        // client.close();
    }
})