var moment=require('moment')

var date=moment()
console.log(date.format('h:mm a'))

var createdAt=100000
console.log(moment(createdAt).format('h:mm a'))