const c=require('./db')
module.exports.handle=(email,pwd)=>{
    db.saveUser({email,pwd})
}