import sinon from 'sinon';

import httpBackend from '../../../client/js/services/httpBackend.es6';
import Http from '../../../client/js/services/http.es6';
import events from '../../../client/js/services/events.es6';

import exampleResponse from './example-response-200.es6';
import failedResponse from './example-response-401.es6';

describe('The HTTP Service', function () {

    let server, http;

    beforeEach(function () {
        server = sinon.fakeServer.create();
        http = new Http(httpBackend, events);
    });

    afterEach(function () {
        server.restore();
    });

    it('should send a GET request', function (done) {
        server.respondWith('GET', '/some/article/comments.json', exampleResponse);
        http.get('/some/article/comments.json').then(response => {
            expect(response.data.comment).toEqual('Hey there');
            done();
        });
        server.respond();
    });

    it('should notify the event system if a request was unsuccessful', function (done) {
        server.respondWith('GET', '/some/article/comments.json', failedResponse);
        events.http.failedRequest.add(function (response) {
            expect(response.status).toBe(401);
            done();
        });

        http.get('/some/article/comments.json');
        server.respond();
    });
});

