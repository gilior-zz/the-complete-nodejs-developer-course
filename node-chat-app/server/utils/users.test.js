const {Users} = require('./users')
const expect = require('expect')

describe('users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        for (let i = 1; i < 4; i++)
            users.users.push({
                id: `id${i}`,
                name: `name${i}`,
                room: `room${i % 2}`,
            })

    })
    it('shld add new user', () => {

        var usr = {
            id: '123',
            name: 'lior',
            room: 'liors room',
        }
        var res = users.addUser(usr.id, usr.name, usr.room)

        expect(users.users).toEqual(expect.arrayContaining([usr]));

    })

    it('shld return name per room1', () => {
        let room1users = users.getUsersList('room1')
        expect(room1users).toEqual(['name1', 'name3'])
    })
    it('shld return name per room0', () => {
        let room0users = users.getUsersList('room0')
        expect(room0users).toEqual(['name2'])
    })
    it('shld remove a usr', () => {
        var usr = users.removeUser('id1');
        expect(users.users.length).toEqual(2)
        expect(usr.id).toEqual('id1')
    })
    it('shld not remove a usr', () => {
        var usr = users.removeUser('id8');
        expect(users.users.length).toEqual(3)
        expect(usr).toBeFalsy()
    })
    it('shld get a usr', () => {
        var usr = users.getUser('id1');
        expect(usr.id).toEqual('id1')
    })
    it('shld not get a usr', () => {
        var usr = users.getUser('id8');
        expect(usr).toBeFalsy();
    })
})