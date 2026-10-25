import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "yts",
    "accessor": "Yts",
    "op": "load",
    "method": "GET",
    "path": "/api/search/yts",
    "args": [],
    "select": {
      "text": "heat waves"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "text"
    ],
    "queryArgs": [
      {
        "name": "text",
        "wire": "text"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "code": 200,
      "status": true,
      "creator": "𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀",
      "result": {
        "title": "Glass Animals - Heat Waves (Official Video)",
        "type": "video",
        "views": 877598844,
        "uploaded": "5 years ago",
        "duration": "3 minutes 56 seconds",
        "description": "I LOVE YOU SO F***ING MUCH. Our fourth studio album. Out now. Order :: https://glassanimals.lnk.to/loveYT Official store ...",
        "channel": "Glass Animals",
        "url": "https://youtube.com/watch?v=mRD0-GxqHVo",
        "thumbnail": "https://i.ytimg.com/vi/mRD0-GxqHVo/hq720.jpg"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
