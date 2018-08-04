console.log('starting app.')


// const os = require('os');
const fs = require('fs');
const _ = require('lodash')

const notes = require('./notes');


// let res = notes.addNote();
// console.log(res)
let res = notes.add(2, 2);
console.log(res)
// let userInfo = os.userInfo();
// console.log(userInfo)
// fs.appendFileSync('greeting.txt', `hello ${userInfo.username} u r ${notes.age}`)