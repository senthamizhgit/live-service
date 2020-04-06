const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../lib/db/index');
const Server = require('../../lib/server');

const app = new Server();

describe('GET /v1/live-feeds/', () => {
    before((done) => {
        conn.connect()
        .then(()=> {
            app.startServer();
            done();
        })
        .catch((err) => done(err))
        
    })

    after((done) => {
        app.server.close();
        done();
    })

    it('Check Server Status', (done) => {
        request(app.server).get('/').send()
        .then((res) => {
            const status = res.status;
            expect(status).equals(200);
            done();
        })
        .catch((err) => {
            done(err);
        })
    })

    it('Get all feeds /v1/live-feeds', (done) => {
        request(app.server).get('/v1/live-feeds').send()
        .then((res) => {
            const body = res.body;
            const status = res.status;
            expect(status).equals(200);
            done();
        })
        .catch((err) => {
            done(err);
        })
    })

})