var expect = require('expect');
var {genMsg, genLocMsg} = require('./msg');
describe('gen msg', () => {
    it('shld return msg obj', () => {
        var from = 'from';
        var text = 'text';
        var obj = genMsg(from, text);
        var expectedObj = {from, text}
        expect(obj).toMatchObject(expectedObj);
        expect(typeof obj.createdAt).toBe('number');
    })
})

describe('gen lov msg', () => {
    it('shld return loc msg obj', () => {
        var from = 'tester'
        var lat = 22
        var long = 33
        var obj = genLocMsg(from,lat, long);
        var expectedObj = {from, url: `https://www.google.co.il/maps?q=${lat},${long}`}
        expect(obj).toMatchObject(expectedObj);
        expect(typeof obj.createdAt).toBe('number');
    })
})