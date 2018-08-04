const express = require('express')

var app = express();
app.get('/', (req, res) => {
    res.status(404).send({err:'not found',name:'lior'})
})

app.get('/users',(req,res)=>{
    res.status(200).send([
        {name:'a',age:1},
        {name:'b',age:2},
        {name:'c',age:3},
        {name:'d',age:4},
    ])
})

app.listen(3000)

module.exports.app = app;