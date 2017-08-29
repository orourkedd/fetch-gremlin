const fetch = require('fetch-everywhere')

module.exports = function(options = {}) {
  const proability = {
    throwError: options.throwError === undefined ? 0.2 : options.throwError,
    badResponse: options.badResponse === undefined ? 0.2 : options.badResponse
  }
  return function() {
    if (shouldFail(proability.throwError))
      throw new Error('Unexpected Error (Fetch Gremlin)')

    if (shouldFail(proability.badResponse)) {
      const responseInit = {
        status: 500,
        statusText: 'Internal Server Error (Fetch Gremlin)'
      }
      const response = new Response(null, responseInit)
      return Promise.resolve(response)
    }

    return fetch.apply(fetch, arguments)
  }
}

function shouldFail(failureProbability) {
  if (failureProbability === 0) return false
  return failureProbability >= Math.random()
}
