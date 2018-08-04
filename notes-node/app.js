const _ = require('lodash')
const fs = require('fs')
const yargs = require('yargs')


const notes = require('./notes')

// const yargvs = yargs.argv;

var title = {
    describe: 'title of note',
    demand: true,
    alias: 't'
};
var body = {
    alias: 'b',
    describe: 'body of note',
    demand: true
};
const yargvs = yargs
    .command('add', 'add note to notes', {title, body})
    .command('list', 'generate list of notes')
    .command('read', 'read a note', {title})
    .command('remove', 'remove a note', {title})
    .help().argv;
// console.log('process.argvp',process.argv)
// console.log('yargs.argv',yargvs)
// console.log(process.argv[2])

// let l=process.argv[2];
let l = yargvs._[0];
switch (l) {
    case 'add'   :
        var newNode = notes.addNote(yargvs.title, yargvs.body)
        if (!newNode) console.log('already exists');
        else notes.logNote(newNode)
        break;
    case 'list':
        notes.getAll();
        break;
    case 'read':
        var note = notes.read(yargvs.title);
        note ? notes.logNote(note) : console.log('note wasnt found')
        break;
    case 'remove':
        var removed = notes.remove(yargvs.title)
        if (removed) console.log('note was removed');
        else console.log('note wasnt found');
        break;
    default:
        console.log('idle!!')
        break;
}

