import _ from "lodash";

function createXhr() {
  return new window.XMLHttpRequest();
}

function completeRequest(callback, status, response, headersString, statusText) {
  callback(status, response, headersString, statusText);
}

function removeEmptyHeaders(headers) {
  return _(headers).pick(_.identity);
}

function httpBackend(method, url, headers, post, callback, timeout, withCredentials, responseType) {
  let xhr = createXhr();

  xhr.open(method, url, true);
  removeEmptyHeaders(headers).forEach(function(value, key) {
    xhr.setRequestHeader(key, value);
  }).value();

  xhr.onload = function requestLoaded() {
    let statusText = xhr.statusText || '';

    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
    // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
    let response = ('response' in xhr) ? xhr.response : xhr.responseText;

    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
    let status = xhr.status === 1223 ? 204 : xhr.status;

    completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText);
  };

  let requestError = function() {
    // The response is always empty
    // See https://xhr.spec.whatwg.org/#request-error-steps and https://fetch.spec.whatwg.org/#concept-network-error
    completeRequest(callback, -1, null, null, '');
  };

  xhr.onerror = requestError;
  xhr.onabort = requestError;

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  if (responseType) {
    try {
      xhr.responseType = responseType;
    } catch (e) {
      // WebKit added support for the json responseType value on 09/03/2013
      // https://bugs.webkit.org/show_bug.cgi?id=73648. Versions of Safari prior to 7 are
      // known to throw when setting the value "json" as the response type. Other older
      // browsers implementing the responseType
      //
      // The json response type can be ignored if not supported, because JSON payloads are
      // parsed on the client-side regardless.
      if (responseType !== 'json') {
        throw e;
      }
    }
  }

  if (timeout) {
    xhr.timeout = timeout;
    xhr.ontimeout = requestError;
  }

  xhr.send(post || null);
}

export default httpBackend;
