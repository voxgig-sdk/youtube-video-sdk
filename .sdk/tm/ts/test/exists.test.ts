
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YoutubeVideoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YoutubeVideoSDK.test()
    equal(testsdk instanceof YoutubeVideoSDK, true,
      'YoutubeVideoSDK.test() must return a client synchronously')
  })

})
