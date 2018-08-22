const {isRealString} = require('./validation')
const expect = require('expect')
describe('is real string', () => {
    it('shld reject non string vals', () => {
        const str = 8;
        expect(isRealString(str)).toBeFalsy();
    })
    it('shld reject just space string', () => {
        const str = '    ';
        expect(isRealString(str)).toBeFalsy();
    })
    it('shld allow valid string', () => {
        const str = '  kjh  ';
        expect(isRealString(str)).toBeTruthy();
    })
})