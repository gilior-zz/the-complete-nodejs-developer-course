const expect = require('expect')
const request = require('supertest')

const {app} = require('../server')
const {ToDo} = require('../model/todo')
const user = require('../model/user')

beforeEach((done) => {
    ToDo.remove({}).then(() => done())
})

describe(('post /todos'), () => {
    it('shld create new todo', (done) => {
        var text = 'text from test haha'
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err)
                ToDo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => done(err)
                    )
            })
    });

    it('shlld not create 2 do wth bad data',(done)=>{

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                ToDo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(0);
                        done();
                    })
                    .catch((err) => done(err)
                    )
            })
    })
})



