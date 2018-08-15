const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')
const {app} = require('../server')
const {ToDo} = require('../model/todo')
const {User} = require('../model/user')
const {todos, genToDos, genUsers, users} = require('./seed/seed')

beforeEach(genUsers);
beforeEach(genToDos);


// describe(('post /todos'), () => {
//     it('shld create new todo', (done) => {
//         var text = 'text from test haha'
//         request(app-
//             .post('/todos')
//              .set('x-auth', users[0].tokens[0].token)
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) return done(err)
//                 ToDo.find({text})
//                     .then((todos) => {
//                         expect(todos.length).toBe(1);
//                         expect(todos[0].text).toBe(text);
//                         done();
//                     })
//                     .catch((err) => done(err)
//                     )
//             })
//     });
//
//     it('shlld not create 2 do wth bad data', (done) => {
//
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) return done(err)
//                 ToDo.find()
//                     .then((todos) => {
//                         expect(todos.length).toBe(2);
//                         done();
//                     })
//                     .catch((err) => done(err)
//                     )
//             })
//     })
// })
//
// describe('get /todos', () => {
//     it('shld get 2 todos', (done) => {
//         request(app)
//             .get('/todos')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(1)
//
//             })
//             .end(done)
//     })
// })

// describe('get /todos/:id', () => {
//     it('shld return proper todo for valid id', (done) => {
//         request(app)
//             .get('/todos/' + todos[0]._id.toHexString())
//              .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 console.log(res.body)
//                 expect(res.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done)
//
//     });
//     it('shld return 404 if todo not found', (done) => {
//         request(app)
//             .get('/todos/' + new ObjectID().toHexString())
//              .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done)
//     });
//     it('shld return 404 for invalid id', (done) => {
//         request(app)
//             .get('/todos/' + 1)
//             .expect(404)
//             .end(done)
//     })
// })
// describe('rempove/:id', () => {
//     it('shld remove todo per id', (done) => {
//         request(app)
//             .delete('/todos/' + todos[0]._id.toHexString())
//              .set('x-auth', users[1].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body._id).toBe(todos[0]._id.toHexString())
//             })
//             .end((err, res) => {
//                 if (err) return done(err)
//                 ToDo.findById(todos[0]._id.toHexString())
//                     .then((todo) => {
//                         console.log(todo)
//                         expect(todo).toBeFalsy();
//                         done();
//                     })
//                     .catch((err) => {
//                         return done(err)
//                     })
//             })
//     })
//     it('shld return 404 id todo is invalid', (done) => {
//         request(app)
//             .delete('/todos/' + 123)
//              .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done)
//     })
//     it('shld return 404 id todo not found', (done) => {
//         request(app)
//             .delete('/todos/' + new ObjectID().toHexString())
//              .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done)
//     })
// })

describe('patch todo updae data', () => {
    // it('shld update completed to true and time to number', (done) => {
    //     request(app)
    //         .patch('/todos/' + todos[0]._id.toHexString())
    //              .set('x-auth', users[0].tokens[0].token)

    //         .send({completed: true, text: "test text"})
    //         .expect(200)
    //         .expect((obj) => {
    //
    //             expect(obj.body.updatedToDo.text).toBe('test text');
    //             expect(obj.body.updatedToDo.completedAt).toBeA('number');
    //             expect(obj.body.updatedToDo.completed).toBeTruthy();
    //
    //         })
    //         .end(done)
    // })

    // it('shld set completedAt to null and completed to false', (done) => {
    //     request(app)
    //         .patch('/todos/' + todos[1]._id.toHexString())
    //              .set('x-auth', users[0].tokens[0].token)

    //         .send({completed: false, text: "test text"})
    //         .expect(200)
    //         .expect((obj) => {
    //
    //             expect(obj.body.updatedToDo.text).toBe('test text');
    //             expect(obj.body.updatedToDo.completedAt).toBeFalsy();
    //             expect(obj.body.updatedToDo.completed).toBeFalsy();
    //
    //         })
    //         .end(done)
    // })
})

// describe('geet users/me', () => {
//     it('shld not get user when no auth tkn provided', (done) => {
//         request(app)
//             .get('/users/me')
//             .expect(401)
//             .expect((res) => {
//                 expect(res.body).toEqual({});
//             })
//             .end(done)
//     })
//     it('shld  get user when  auth tkn provided', (done) => {
//         request(app)
//             .get('/users/me')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body._id).toBe(users[0]._id)
//                 expect(res.body.email).toBe(users[0].email)
//             })
//             .end(done);
//     })
// })

const secret = 'secret'
// describe('save new user /POST /users', () => {
//     xit('shld create new user', (done) => {
//         request(app)
//             .post('/users')
//             .send({email: 'z@z.com', pwd: '1q2w3e'})
//             .expect(200)
//             .expect((res) => {
//                 var access = 'auth';
//                 let _id = res.body._id.toHexString()
//                 let obj = {
//                     _id, access
//                 }
//                 var token = jwt.sign(obj, secret).toString();
//
//                 expect(res.headres['x-auth']).toExist();
//                 expect(res.headres['x-auth']).toBe(token);
//                 expect(res.body.email).toBe('z@z.com');
//             })
//             .end((err) => {
//                 if (err) return done(err)
//                 User.findOne({email: 'z@z.com'})
//                     .then((user) => {
//                         expect(user).toExist();
//                         expect(user.pwd).toNotBe('1q2w3e');
//                         done();
//                     })
//    .catch((err) =>done(err));//
//             })
//     });
//     it('shld return error new user args r invalid', (done) => {
//         request(app)
//             .post('/users')
//             .send({email: 'z@z', pwd: '1q2w3e'})
//             .expect(500)
//             .end(done);
//     });
//
//     it('shld return error new user email is already registered', (done) => {
//         request(app)
//             .post('/users')
//             .send({email: 'z@z.com', pwd: '1q2w3e'})
//             .expect(500)
//             .end(done);
//     })
// })

// describe('login user /users.login', () => {
//     it('shld fetch user per valid email+pwd', (done) => {
//         request(app)
//             .post('/users/login')
//             .send({email: users[1].email, pwd: users[1].pwd})
//             .expect(200)
//             .expect((res) => {
//                 var usr = res.body;
//                 expect(usr.email).toBe(users[0].email)
//             })
//             .end((err, res) => {
//                 if (err) return done(err);
//                 User.findById(users[1]._id)
//                     .then((user) => {
//                         expect(user.tokens[1]).toInclude({token: res.headers['x-auth'], access: 'auth'})
//                         done();
//                     })
//                     .catch((err) => done(err));
//
//             });
//     })
//
//     it('shld not fetch user per invalid email+pwd', (done) => {
//         request(app)
//             .post('/users/login')
//             .send({email: users[0].email + 1, pwd: users[0].pwd})
//             .expect(401)
//             .expect((res) => {
//                 var usr = res.body;
//                 expect(res.headers['x-auth']).toNotExist()
//             })
//             .end((err, res) => {
//                 if (err) return done(err);
//                 User.findById(users[0]._id)
//                     .then((user) => {
//                         expect(user.tokens.length).toBe(0)
//                         done();
//                     })
//                     .catch((err) => done(err))
//             })
//     })
// })


describe('remove token /users/me/token', () => {
    it('shld remove token for valid token', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                User.findById(users[0]._id)
                    .then((user) => {
                        expect(user.tokens.length).toBe(0);
                        done();
                    })
                    .catch((err) => done(err));
            })
    })

    it('shld return 401 for invalid token', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token + 'a')
            .expect(500)
            .end((err, res) => {
                if (err) return dine(err)
                User.findbyId(users[0]._id)
                    .then((user) => {
                        expect(user.tokens.length).toBe(1)
                    })
                    .catch((err) => done(err))
            })

    })
})