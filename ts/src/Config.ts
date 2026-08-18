
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


  main = {
    name: 'YoutubeVideo',
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
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "thumbnail",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "uploaded",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "views",
          "req": true,
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

