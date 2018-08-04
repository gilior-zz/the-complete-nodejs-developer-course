const expect = require('expect')
const rewire = require('rewire')

var app = rewire('./app')
// app.__set__
// app.__get__
describe('app', () => {
    var db = {
        saveUser: expect.createSpy()
    }
    app.__set__('db', db)
    it('shld call spy nicely', () => {
        var spy = expect.createSpy();
        spy('andrew', 25);
        expect(spy).toHaveBeenCalledWith('andrew', 25);
    })

    it('shld call save user with user obj', () => {
        var obj={email: 'sddfdsf', pwd: 'sdds'}
        app.handle(obj)
        expect(db.saveUser).toHaveBeenCalledWith(obj)
    })
})