const _ = require('lodash')
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            messae: `{VALUE} is not a valid email`
        }
    },
    pwd: {
        type: String,
        required: true,
        minLength: 3
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    let _id = user._id.toHexString()
    let obj = {
        _id, access
    }
    var token = jwt.sign(obj, process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{
        access, token
    }])
    return user.save()
        .then(() => token)

}

userSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email', 'pwd', 'tokens']);
}

userSchema.statics.findByToken = function (tkn) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    }
    catch (err) {
        // return new Promise((res, rej) => {
        //     rej();
        // })
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': tkn,
        'tokens.access': 'auth',

    })
}

userSchema.statics.findByCredentials = function (email, pwd) {
    var User = this;
    return User.findOne({email})
        .then((user) => {
            if (!user) return Promise.reject()
            var hashed = user.pwd;
            return new Promise((res, rej) => {
                bcryptjs.compare(pwd, hashed, (err, flag) => {
                    if (err || !flag) rej()
                    else
                        res(user);
                })
            })

        })
        .catch(() => Promise.reject())

}
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('pwd'))
        bcryptjs.genSalt(5, (err, salt) => {
            bcryptjs.hash(user.pwd, salt, (err, hash) => {
                user.pwd = hash;
                next();
            })
        })

    else next();
})

userSchema.methods.removeToken = function (token) {
    var user = this;
    user.tokens = [];
    return user.update({
        $pull: {
            tokens: {token}
        }
    });


}

var User = mongoose.model('User',
    userSchema);


module.exports.User = User;