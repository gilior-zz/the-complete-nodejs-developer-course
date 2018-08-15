const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
var msg = 'user 3'
//
// var hashed = SHA256(msg).toString();
//
// const secret = 'secret'
// var data = {
//     id: 4
// };
//
// var data_another = {
//     id: 4
// };
//
// var token = jwt.sign(data, secret)
//
//
// var tok_another = jwt.sign(data, secret)

// console.log('data',JSON.stringify(data,undefined,2))
// console.log('token',token)

// var decoded = jwt.verify(token, secret)
// console.log('decoded', decoded)

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// }
//
// token.data.id = 4
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
// console.log('token.hash: ' + token.hash)
// console.log('resultHash: ' + resultHash)
// if (resultHash === token.hash)
//     console.log('no change')
// else console.log('change carefull')

var pwd = 'lior';
bcryptjs.genSalt(100, (err, salt) => {
    bcryptjs.hash(pwd, salt, (err, hash) => {
        console.log('hash',hash)
    })
})

var hashed='$2a$10$mZcM8HjuULVvejHj6X1V5ucbBnkI6Xz7NmQYyfaWcuGcpK6xCBW96';

bcryptjs.compare(pwd,hashed,(err,res)=>{
    console.log('res',res)
})
