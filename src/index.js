const fetch = require('fetch-everywhere')

module.exports = function(options = {}) {
  const proability = {
    immediatelyFailure: options.immediatelyFailure || 0.2,
    badResponse: options.badResponse || 0.2
  }
  return function() {
    if (shouldFail(proability.immediatelyFailure))
      throw new Error('Unexpected Error (Fetch Gremlin)')

    if (shouldFail(proability.badResponse)) {
      const responseInit = {
        status: 500,
        statusText: 'Internal Server Error (Fetch Gremlin)'
      }
      const responseBlob = new Blob()
      const response = new Response(responseBlob, responseInit)
      return Promise.resolve(response)
    }

    return fetch.apply(fetch, arguments)
  }
}

function shouldFail(failureProbability) {
  if (failureProbability === 0) return false
  return failureProbability >= Math.random()
}
