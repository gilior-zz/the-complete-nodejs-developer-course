// var obj = {
//     name: 'lior'
// }
//
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj)
// console.log(stringObj);

// var personString = '{"name":"lior","age":38}';
// var person=JSON.parse(personString);
// console.log(typeof person)
// console.log(person)

const fs = require('fs')

var originNote = {
    title: 'originNote title',
    body: 'originNote body'
}

originNoteString = JSON.stringify(originNote);

fs.writeFileSync('notes.json', originNoteString);
var noteString = fs.readFileSync('notes.json')
var note=JSON.parse(noteString);
console.log(typeof note)
console.log(note);