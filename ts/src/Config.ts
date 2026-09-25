
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'YoutubeVideo',
        slug: "youtube-video",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://abhi-api.vercel.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        yts: {
        },
  
    }
  }


  entity = {
    "yts": {
      "fields": [
        {
          "name": "channel",
          "title": "Channel",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the YouTube channel that uploaded the video"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true,
          "short": "Description of the video"
        },
        {
          "name": "duration",
          "title": "Duration",
          "type": "`$STRING`",
          "req": true,
          "short": "Duration of the video"
        },
        {
          "name": "thumbnail",
          "title": "Thumbnail",
          "type": "`$STRING`",
          "req": true,
          "short": "URL to the video thumbnail image",
          "format": "uri"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true,
          "short": "Title of the YouTube video"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Type of content"
        },
        {
          "name": "uploaded",
          "title": "Uploaded",
          "type": "`$STRING`",
          "req": true,
          "short": "Time since the video was uploaded"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Direct URL to the YouTube video",
          "format": "uri"
        },
        {
          "name": "views",
          "title": "Views",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of views the video has received"
        }
      ],
      "name": "yts",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/search/yts",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "search"
                },
                {
                  "lit": "yts"
                }
              ],
              "parts": [
                "api",
                "search",
                "yts"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "query": [
                  {
                    "name": "text",
                    "orig": "text",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "heat waves"
                  }
                ]
              },
              "select": {
                "exist": [
                  "text"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

