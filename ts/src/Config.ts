
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "req": true,
          "short": "Name of the YouTube channel that uploaded the video",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "req": true,
          "short": "Description of the video",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "req": true,
          "short": "Duration of the video",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "thumbnail",
          "req": true,
          "short": "URL to the video thumbnail image",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "short": "Title of the YouTube video",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "short": "Type of content",
          "type": "`$STRING`"
        },
        {
          "name": "uploaded",
          "req": true,
          "short": "Time since the video was uploaded",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "url",
          "req": true,
          "short": "Direct URL to the YouTube video",
          "type": "`$STRING`"
        },
        {
          "name": "views",
          "req": true,
          "short": "Number of views the video has received",
          "type": "`$INTEGER`"
        }
      ],
      "name": "yts",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "heat waves",
                    "kind": "query",
                    "name": "text",
                    "orig": "text",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "text"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "parts": [
                "api",
                "search",
                "yts"
              ]
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

