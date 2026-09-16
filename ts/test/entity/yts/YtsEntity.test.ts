

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YoutubeVideoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('YtsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YOUTUBE_VIDEO_TEST_LIVE=TRUE.
  afterEach(liveDelay('YOUTUBE_VIDEO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YoutubeVideoSDK.test()
    const ent = testsdk.Yts()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YOUTUBE_VIDEO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'yts.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"channel","req":true,"short":"Name of the YouTube channel that uploaded the video","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":true,"short":"Description of the video","type":"`$STRING`","index$":1},{"active":true,"name":"duration","req":true,"short":"Duration of the video","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"thumbnail","req":true,"short":"URL to the video thumbnail image","type":"`$STRING`","index$":3},{"active":true,"name":"title","req":true,"short":"Title of the YouTube video","type":"`$STRING`","index$":4},{"active":true,"name":"type","req":true,"short":"Type of content","type":"`$STRING`","index$":5},{"active":true,"name":"uploaded","req":true,"short":"Time since the video was uploaded","type":"`$STRING`","index$":6},{"active":true,"format":"uri","name":"url","req":true,"short":"Direct URL to the YouTube video","type":"`$STRING`","index$":7},{"active":true,"name":"views","req":true,"short":"Number of views the video has received","type":"`$INTEGER`","index$":8}],"name":"yts","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"heat waves","kind":"query","name":"text","orig":"text","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/search/yts","json":"{\"operationId\":\"searchYouTubeVideos\",\"parameters\":[{\"description\":\"Search query text to find YouTube videos\",\"in\":\"query\",\"name\":\"text\",\"required\":true,\"schema\":{\"example\":\"heat waves\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":200,\"creator\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"result\":{\"channel\":\"Glass Animals\",\"description\":\"I LOVE YOU SO F***ING MUCH. Our fourth studio album. Out now. Order :: https://glassanimals.lnk.to/loveYT Official store ...\",\"duration\":\"3 minutes 56 seconds\",\"thumbnail\":\"https://i.ytimg.com/vi/mRD0-GxqHVo/hq720.jpg\",\"title\":\"Glass Animals - Heat Waves (Official Video)\",\"type\":\"video\",\"uploaded\":\"5 years ago\",\"url\":\"https://youtube.com/watch?v=mRD0-GxqHVo\",\"views\":877598844},\"status\":true},\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":200,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator attribution\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"result\":{\"properties\":{\"channel\":{\"description\":\"Name of the YouTube channel that uploaded the video\",\"example\":\"Glass Animals\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the video\",\"example\":\"I LOVE YOU SO F***ING MUCH. Our fourth studio album. Out now. Order :: https://glassanimals.lnk.to/loveYT Official store ...\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the video\",\"example\":\"3 minutes 56 seconds\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"URL to the video thumbnail image\",\"example\":\"https://i.ytimg.com/vi/mRD0-GxqHVo/hq720.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the YouTube video\",\"example\":\"Glass Animals - Heat Waves (Official Video)\",\"type\":\"string\"},\"type\":{\"description\":\"Type of content\",\"example\":\"video\",\"type\":\"string\"},\"uploaded\":{\"description\":\"Time since the video was uploaded\",\"example\":\"5 years ago\",\"type\":\"string\"},\"url\":{\"description\":\"Direct URL to the YouTube video\",\"example\":\"https://youtube.com/watch?v=mRD0-GxqHVo\",\"format\":\"uri\",\"type\":\"string\"},\"views\":{\"description\":\"Number of views the video has received\",\"example\":877598844,\"type\":\"integer\"}},\"required\":[\"title\",\"type\",\"views\",\"uploaded\",\"duration\",\"description\",\"channel\",\"url\",\"thumbnail\"],\"type\":\"object\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"result\"],\"type\":\"object\"}}},\"description\":\"Successful response with video information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Invalid search query parameter\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request - missing or invalid search query\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Invalid search query parameter\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"No videos found for the given search query\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Invalid search query parameter\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/search/yts","segments":[{"lit":"api"},{"lit":"search"},{"lit":"yts"}],"select":{"exist":["text"]},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"yts","name__orig":"yts","Name":"Yts","name_":"yts","name-":"yts","NAME":"YTS","index$":0}, {"active":true,"entity":"yts","key$":"BasicYtsFlow","kind":"basic","name":"BasicYtsFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"yts_ref01","srcdatavar":"yts_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-yts_ref01"}}],"index$":0}]}, 'Yts')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let yts_ref01_data = Object.values(setup.data.existing.yts)[0] as any

    // LOAD
    const yts_ref01_ent = client.Yts()
    const yts_ref01_match_dt0: any = {}
    const yts_ref01_data_dt0 = (await yts_ref01_ent.load(yts_ref01_match_dt0)).data()
    assert(null != yts_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/yts/YtsTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YoutubeVideoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['yts01','yts02','yts03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YOUTUBE_VIDEO_TEST_YTS_ENTID': idmap,
    'YOUTUBE_VIDEO_TEST_LIVE': 'FALSE',
    'YOUTUBE_VIDEO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YOUTUBE_VIDEO_TEST_YTS_ENTID']

  const live = 'TRUE' === env.YOUTUBE_VIDEO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YOUTUBE_VIDEO_TEST_YTS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YoutubeVideoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YOUTUBE_VIDEO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
