const {User} = require('../model/user')
var authenticate = (req, res, next) => {
    var tkn = req.header('x-auth');

    User.findByToken(tkn)
        .then((user) => {
            if (!user) return Promise.reject();
            req.user = user;
            req.token = tkn;
            next()
        })
        .catch((err) => res.status(401).send(err))
}

module.exports = {authenticate}