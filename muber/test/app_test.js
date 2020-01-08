const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    // tests are almost always async, always need done
    it('handles a GET request to /api', (done) => {
        // make a call to our app
        request(app)
        // chain on some number of customizing requests
        .get('/api')
        // err is not an error in the response, err is if something was broken in the request
        // the thing we really care about is the response object
        .end((err, response) => {
            assert(response.body.hi === 'there');
            done();
        })
    });
});