const request = require('supertest');
const router = require('./auth-router.js');
const Users = require('../users/users-model.js')

describe('auth-router.js', () => {
    describe('POST /register', () => {
        it('returns saved user', () => {
                request(router)
                .post('/register')
                .send('username=Joel','password=pass')
                .set('Accept', 'application/json')
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    done(); })
        });
    });
    describe('POST /login', () => {
        it('returns a cookie', () => {
                request(router)
                .post('/login')
                .send('username=Joel','password=pass')
                .set('token', 'application/json')
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    done(); })
        });
    });
   
})