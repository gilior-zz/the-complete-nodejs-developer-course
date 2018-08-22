class Users {


    constructor() {
        this.users = [];

    }

    addUser(id, name, room) {
        this.users.push({id, name, room})
        return {id, name, room}
    }

    removeUser(id) {
        var usr=this.getUser(id)
        this.users = this.users.filter(i => i.id != id);
        return  usr;
    }

    getUser(id) {
        return this.users.filter(i => i.id === id)[0];
    }

    getUsersList(room) {
        return this.users.filter(i => i.room === room).map(i => i.name);
    }
}

module.exports = {Users}

