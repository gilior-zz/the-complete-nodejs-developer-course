const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var config_env = config[env];
    Object.keys(config_env).forEach((key) => {
        process.env[key] = config_env[key];
    })

}
console.log('env ****', env)
// if (env === 'development') {
//     process.env.PORT = 5000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp'
// } else if (env === 'test') {
//     process.env.PORT = 5000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest'
// }