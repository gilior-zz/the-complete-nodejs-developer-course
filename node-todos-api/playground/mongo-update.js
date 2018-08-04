const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAoo', (err, client) => {
    if (err) console.log('unable 2 connect to mongodb server')
    else {
        console.log('successfuly 2 connect to mongodb server')
        const db = client.db('ToDoApp');
        db.collection('users')
            .findOneAndUpdate({_id: new ObjectID('5b657b173cc8f20f0c3b0a23')}, {
                $set: {name: 'lior'},
                $inc: {age: 1}
            }, {returnOriginal: false})
            .then((res) => {
                console.log(JSON.stringify(res, undefined, 2))
            })


        // client.close();
    }
})