const utils = require('./utils')
const expect = require('expect')

describe('utils', () => {
    describe('#add', () => {
        it('should async add 2 nums', (done) => {
            utils.asyncAdd(3, 4, function (sum) {
                expect(sum).toBe(7).toBeA('number')
                done();
            });
        })
        it('should add 2 numbers', () => {
            var res = utils.add(33, 11);
            if (res !== 44)
                throw new Error(`expected 44, but got ${res}`)
        })

    })

    it('should square 1 number', () => {
        var res = utils.square(11);
        if (res !== 121)
            throw new Error(`expected 44, but got ${res}`)
    })

    it('should async square', (done) => {
        utils.asyncSquare(5, function (bigNum) {
            expect(bigNum).toEqual(25).toBeA('number');
            done();
        })
    })
})


it('should...', () => {
    var res = utils.add(3, 47);
    expect(res).toBe(50).toBeA('number')
})


it('should...', () => {
    var res = utils.add(11, 11);
    expect(res).toNotBe(21).toBeA('number')
})
it('should...', () => {
    var res = utils.add(11, 11);
    expect({res: 'res'}).toEqual({res: 'res'})
})
it('should...', () => {
    var res = utils.add(11, 11);
    expect({res: 'res'}).toInclude({res: 'res'})
})
it('should...', () => {
    var res = utils.add(11, 11);
    expect({res: 'res'}).toExclude({res: 're'})
})
it('should...', () => {
    var res = utils.add(11, 11);
    expect([1, 2, 3, 4, 5]).toInclude(4)
})
it('should...', () => {
    var res = utils.add(11, 11);
    expect([1, 2, 3, 4, 5]).toExclude(44)
})
it('should set 1st & lst name', () => {
    var user = utils.setName({}, 'l o');

    expect(user).toInclude({firstName: 'l'})
    expect(user).toInclude({lastName: 'o'})
    expect(user).toBeA(Object)
})


