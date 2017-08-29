'use strict';

var fetch = require('fetch-everywhere');

module.exports = function () {
  var failureProbability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;

  return function () {
    if (shouldFail(failureProbability / 2)) throw new Error('Unexpected Error (Fetch Gremlin)');

    if (shouldFail(failureProbability / 2)) {
      var responseInit = {
        status: 500,
        statusText: 'Internal Server Error (Fetch Gremlin)'
      };
      var responseBlob = new Blob();
      var response = new Response(responseBlob, init);
      return Promise.resolve(response);
    }

    return fetch.apply(fetch, arguments);
  };
};

function shouldFail(failureProbability) {
  return failureProbability >= Math.random();
}
//# sourceMappingURL=index.js.map