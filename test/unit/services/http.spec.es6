import httpBackend from '../../../client/js/services/httpBackend.es6';
import Http from '../../../client/js/services/http.es6';
import events from '../../../client/js/services/events.es6';
import sinon from 'sinon';

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
        server.respondWith('GET', '/some/article/comments.json', [200, { "Content-Type": 'application/json' }, '{ "id": 12, "comment": "Hey there" }']);

        http.get('/some/article/comments.json').then(response => {
            expect(response.data.comment).toEqual('Hey there');
            done();
        });

        server.respond();
    });
});

