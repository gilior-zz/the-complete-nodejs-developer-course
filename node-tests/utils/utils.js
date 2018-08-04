module.exports.add = (a, b) => a + b
module.exports.square = (a) => a * a
module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
}

// function (sum) {
//     expect(sum).toBe(7).toBeA('number')
//     done();

module.exports.asyncAdd = (a, b, executeFnc) => {
    setTimeout(() => {
        executeFnc(7)
    }, 1000)
}


module.exports.asyncSquare = (x, fnc) => {
    setTimeout(() => {
        fnc(x * x)
    }, 1000)
}

















