
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "api",
                "search",
                "yts"
              ],
              "select": {
                "exist": [
                  "text"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
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
  config
}

