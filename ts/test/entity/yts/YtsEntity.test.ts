

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"channel":{"a":true,"h":"Channel","n":"channel","r":true,"sh":"Name of the YouTube channel that uploaded the video","t":"`$STRING`","key$":"channel","index$":0},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"Description of the video","t":"`$STRING`","key$":"description","index$":1},"duration":{"a":true,"h":"Duration","n":"duration","r":true,"sh":"Duration of the video","t":"`$STRING`","key$":"duration","index$":2},"thumbnail":{"a":true,"fo":"uri","h":"Thumbnail","n":"thumbnail","r":true,"sh":"URL to the video thumbnail image","t":"`$STRING`","key$":"thumbnail","index$":3},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"Title of the YouTube video","t":"`$STRING`","key$":"title","index$":4},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Type of content","t":"`$STRING`","key$":"type","index$":5},"uploaded":{"a":true,"h":"Uploaded","n":"uploaded","r":true,"sh":"Time since the video was uploaded","t":"`$STRING`","key$":"uploaded","index$":6},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"Direct URL to the YouTube video","t":"`$STRING`","key$":"url","index$":7},"views":{"a":true,"h":"Views","n":"views","r":true,"sh":"Number of views the video has received","t":"`$INTEGER`","key$":"views","index$":8}},"name":"yts","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/search/yts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"heat waves","k":"query","n":"text","or":"text","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/search/yts","q":{"exist":["text"]},"r":{},"s":[{"lit":"api"},{"lit":"search"},{"lit":"yts"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"yts","name__orig":"yts","Name":"Yts","name_":"yts","name-":"yts","NAME":"YTS","index$":0}, {"active":true,"entity":"yts","key$":"BasicYtsFlow","kind":"basic","name":"BasicYtsFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"yts_ref01","srcdatavar":"yts_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-yts_ref01"}}],"index$":0}]}, 'Yts', {"GET /api/search/yts":{"protocol":"http","operationId":"searchYouTubeVideos","responses":{"200":{"description":"Successful response with video information","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"description":"HTTP status code","example":200,"key$":"code","type":"integer"},"status":{"description":"Indicates if the request was successful","example":true,"key$":"status","type":"boolean"},"creator":{"description":"API creator attribution","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","key$":"creator","type":"string"},"result":{"key$":"result","properties":{"channel":{"description":"Name of the YouTube channel that uploaded the video","example":"Glass Animals","type":"string","key$":"channel"},"description":{"description":"Description of the video","example":"I LOVE YOU SO F***ING MUCH. Our fourth studio album. Out now. Order :: https://glassanimals.lnk.to/loveYT Official store ...","type":"string","key$":"description"},"duration":{"description":"Duration of the video","example":"3 minutes 56 seconds","type":"string","key$":"duration"},"thumbnail":{"description":"URL to the video thumbnail image","example":"https://i.ytimg.com/vi/mRD0-GxqHVo/hq720.jpg","format":"uri","type":"string","key$":"thumbnail"},"title":{"description":"Title of the YouTube video","example":"Glass Animals - Heat Waves (Official Video)","type":"string","key$":"title"},"type":{"description":"Type of content","example":"video","type":"string","key$":"type"},"uploaded":{"description":"Time since the video was uploaded","example":"5 years ago","type":"string","key$":"uploaded"},"url":{"description":"Direct URL to the YouTube video","example":"https://youtube.com/watch?v=mRD0-GxqHVo","format":"uri","type":"string","key$":"url"},"views":{"description":"Number of views the video has received","example":877598844,"type":"integer","key$":"views"}},"required":["title","type","views","uploaded","duration","description","channel","url","thumbnail"],"type":"object","x-ref":"#/components/schemas/VideoDetails","index$":0}},"required":["code","status","result"],"x-ref":"#/components/schemas/VideoResponse"},"example":{"code":200,"status":true,"creator":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","result":{"title":"Glass Animals - Heat Waves (Official Video)","type":"video","views":877598844,"uploaded":"5 years ago","duration":"3 minutes 56 seconds","description":"I LOVE YOU SO F***ING MUCH. Our fourth studio album. Out now. Order :: https://glassanimals.lnk.to/loveYT Official store ...","channel":"Glass Animals","url":"https://youtube.com/watch?v=mRD0-GxqHVo","thumbnail":"https://i.ytimg.com/vi/mRD0-GxqHVo/hq720.jpg"}}}}},"400":{"description":"Bad request - missing or invalid search query","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code","example":400},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"message":{"type":"string","description":"Error message describing what went wrong","example":"Invalid search query parameter"}},"required":["code","status","message"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"No videos found for the given search query","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code","example":400},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"message":{"type":"string","description":"Error message describing what went wrong","example":"Invalid search query parameter"}},"required":["code","status","message"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code","example":400},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"message":{"type":"string","description":"Error message describing what went wrong","example":"Invalid search query parameter"}},"required":["code","status","message"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"text","in":"query","description":"Search query text to find YouTube videos","required":true,"schema":{"type":"string","example":"heat waves"},"index$":0}],"securitySource":"unspecified"}})
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
  
