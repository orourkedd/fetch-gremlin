const fetch = require('fetch-everywhere')

module.exports = function() {
  if (shouldFail()) throw new Error('Unexpected Error (Fetch Gremlin)')

  if (shouldFail()) {
    const responseInit =
      status: 500,
      statusText: 'Internal Server Error (Fetch Gremlin)'
    }
    const responseBlob = new Blob()
    const response = new Response(responseBlob, init)
    return Promise.resolve(response)
  }

  return fetch.apply(fetch, arguments)
}

function shouldFail() {
  return 0.2 >= Math.random()
}
