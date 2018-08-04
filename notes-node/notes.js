console.log('startring notes.js')
// console.log(module);
const fs = require('fs');
const _ = require('lodash')
// module.exports.age = 25
// module.exports.addNote = () => {
// console.log('add note');
// return 'new note'
// }
//
// module.exports.add = (a,b) => {
//     console.log(a);
//     console.log(b);
//     return a+b;
// }

var fetchNotes = () => {
    var notes = [];
    try {
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    }
    catch (e) {
    }

    return notes;
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));

}

let addNote = (title, body) => {

    var note = {
        title,
        body
    }

    var notes = fetchNotes();
    // var duplicateNotes=_.includes(notes,title)
    var duplicateNotes = notes.filter(i => i.title === title);
    if (duplicateNotes.length > 0) return undefined
    notes.push(note)
    saveNotes(notes);
    return note;
}

let getAll = () => {
    console.log('getAll')
}

let remove = (title) => {
    var notes = fetchNotes();
    var removed = _.remove(notes, (i) => {
        return i.title === title
    });
    saveNotes(notes);
    return removed;
}
let read = (title) => {
    var note = fetchNotes().filter(i => i.title === title);
    // console.log(note)
    return note[0];
}

let logNote = (note) => {
    debugger;
    console.log('note logger', note)
}

module.exports = {addNote, getAll, read, remove, logNote};