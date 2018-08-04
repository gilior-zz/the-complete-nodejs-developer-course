const request = require('supertest')
const expect = require('expect')
const app = require('./server').app
describe('server', () => {
    describe('#/', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect({err: 'not found', name: 'lior'})
                .end(done);
        })

        it('should combine expect and spuertest', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({err: 'not found'})
                })
                .end(done);
        })
    })
    describe('#/users', () => {
        it('should make sure we have 4 users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude(
                        {name: 'a', age: 1},
                    );
                    expect(res.body.length).toEqual(4);
                    expect(res.body[0].name).toEqual('a');

                })
                .end(done)

        })
    })
})






