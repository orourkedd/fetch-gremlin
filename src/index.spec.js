const buildFetch = require('./index')

test('should fetch', async () => {
  const fetch = buildFetch({ badResponse: 0, throwError: 0 })
  const response = await fetch('https://swapi.co/api/people/1')
  const person = await response.json()
  expect(person.name).toEqual('Luke Skywalker')
})

test('should fail immediately', async () => {
  const fetch = buildFetch({ badResponse: 0, throwError: 1 })
  try {
    await fetch('https://swapi.co/api/people/1')
  } catch (e) {
    expect(e.message).toEqual('Unexpected Error (Fetch Gremlin)')
    return
  }
  fail('Did not throw')
})

test('should respond with a 500', async () => {
  const fetch = buildFetch({ badResponse: 1, throwError: 0 })
  const response = await fetch('https://swapi.co/api/people/1')
  expect(response.status, 500)
})
