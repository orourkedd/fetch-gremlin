# Fetch Gremlin

A drop-in replacement for `fetch` that injects failure into your application.  

## Why inject failure into your application?

Because if your application is failing all of the time, you will be forced to write resilient code.

**NOTE**: This module current only works in the browser.

## Usage

You normally use fetch like this:
```js
const fetch = require('fetch-everywhere')
...
fetch('https://example.com/api/users/1').then(() => { ... })
```

Change your code to this:
```js
const fetch = require('fetch-gremlin')()
...
fetch('https://example.com/api/users/1').then(() => { ... })
```

## Probability of failure

There are two types of failure for which you can set the probability: immediately throwing an error or returning an Internal Server Error.

```js
const fetch = require('fetch-gremlin')({
  failImmediately: 0.3, // 30% probability of an exception being thrown
  badResponse: 0.4 // 40% probability of a bad response
})
...
fetch('https://example.com/api/users/1').then(() => { ... })
```