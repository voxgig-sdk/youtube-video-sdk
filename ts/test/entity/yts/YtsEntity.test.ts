

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":true,"sh":"HTTP status code","t":"`$INTEGER`","key$":"code","index$":0},"creator":{"a":true,"h":"Creator","n":"creator","r":false,"sh":"API creator attribution","t":"`$STRING`","key$":"creator","index$":1},"result":{"a":true,"h":"Result","n":"result","r":true,"t":"`$OBJECT`","key$":"result","index$":2},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Indicates if the request was successful","t":"`$BOOLEAN`","key$":"status","index$":3}},"name":"yts","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/search/yts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"heat waves","k":"query","n":"text","or":"text","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/search/yts","q":{"exist":["text"]},"r":{},"s":[{"lit":"api"},{"lit":"search"},{"lit":"yts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"yts","name__orig":"yts","Name":"Yts","name_":"yts","name-":"yts","NAME":"YTS","index$":0}, {"active":true,"entity":"yts","key$":"BasicYtsFlow","kind":"basic","name":"BasicYtsFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"yts_ref01","srcdatavar":"yts_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-yts_ref01"}}],"index$":0}]}, 'Yts', {"GET /api/search/yts":{"protocol":"http","parameters":[{"name":"text","in":"query","description":"Search query text to find YouTube videos","required":true,"schema":{"type":"string","example":"heat waves"},"index$":0}]}})
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
  
