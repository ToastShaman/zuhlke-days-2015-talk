import _ from "lodash";
import RSVP from "rsvp";

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': APPLICATION_JSON + ';charset=utf-8'};
const JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;

function isSuccess(status) {
    return 200 <= status && status < 300;
}

function defaultHttpResponseTransform(data, headers) {
    if (_.isString(data)) {
        var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();
        if (tempData) {
            let contentType = headers['content-type'];
            if (contentType && contentType.indexOf(APPLICATION_JSON) === 0) {
                data = JSON.parse(tempData);
            }
        }
    }
    return data;
}

function defaultHttpRequestTransform(data) {
    if (data) {
        return JSON.stringify(data);
    }
    return data;
}

function parseResponseHeaders(headerStr) {
    let headers = {};
    if (!headerStr) {
        return headers;
    }
    let headerPairs = headerStr.split('\u000d\u000a');
    for (var i = 0, ilen = headerPairs.length; i < ilen; i++) {
        let headerPair = headerPairs[i];
        let index = headerPair.indexOf('\u003a\u0020');
        if (index > 0) {
            let key = headerPair.substring(0, index).toLowerCase();
            let val = headerPair.substring(index + 2);
            headers[key] = val;
        }
    }
    return headers;
}

class Http {

    constructor(httpBackend, events) {
        this.events = events;
        this.httpBackend = httpBackend;
        this.defaults = {
            // transform incoming response data
            transformResponse: [defaultHttpResponseTransform],

            // transform outgoing request data
            transformRequest: [defaultHttpRequestTransform],

            // default headers
            headers: {
                common: {
                    'Accept': 'application/json, text/plain, */*'
                },
                post: _.clone(CONTENT_TYPE_APPLICATION_JSON),
                put: _.clone(CONTENT_TYPE_APPLICATION_JSON),
                patch: _.clone(CONTENT_TYPE_APPLICATION_JSON)
            }
        };
    }

    get(url, headers) {
        return this.sendRequest('GET', url, headers);
    }

    post(url, data, headers) {
        return this.sendRequest('POST', url, headers, data);
    }

    put(url, data, headers) {
        return this.sendRequest('PUT', url, headers, data);
    }

    delete(url, headers) {
        return this.sendRequest('DELETE', url, headers);
    }

    path(url, data, headers) {
        return this.sendRequest('PATCH', url, headers, data);
    }

    sendRequest(method, url, headers, data, timeout, withCredentials, responseType) {
        let transformResponse = this.defaults.transformResponse;
        let events = this.events;
        let deferred = RSVP.defer(), promise = deferred.promise;
        let transformedData = _.clone(data, true);
        let transformedHeader = _.merge(_.clone(headers || {}), this.defaults.headers.common);

        _.forEach(this.defaults.transformRequest, function (fn) {
            if (_.isFunction(fn)) {
                transformedData = fn(transformedData);
            }
        });

        this.httpBackend(method, url, transformedHeader, transformedData, done, timeout, withCredentials, responseType);
        return promise;

        function done(status, response, headers, statusText) {
            let resolve = {
                data: response,
                status: status,
                headers: headers,
                statusText: statusText
            };

            if (isSuccess(status)) {
                resolve.headers = parseResponseHeaders(resolve.headers);
                _.forEach(transformResponse, function(fn) {
                    if (_.isFunction(fn)) {
                        resolve.data = fn(resolve.data, resolve.headers);
                    }
                });
                deferred.resolve(resolve);
            } else {
                if (events) {
                    events.http.failedHttpRequest.dispatch(resolve);
                }
                deferred.reject(resolve);
            }
        }
    }
}

export default Http;