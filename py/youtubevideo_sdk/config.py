# YoutubeVideo SDK configuration


def make_config():
    return {
        "main": {
            "name": "YoutubeVideo",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://abhi-api.vercel.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "yts": {},
            },
        },
        "entity": {
      "yts": {
        "fields": [
          {
            "active": True,
            "name": "channel",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "description",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "duration",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "thumbnail",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "title",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "type",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "uploaded",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "views",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 8,
          },
        ],
        "name": "yts",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "heat waves",
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/yts",
                "parts": [
                  "api",
                  "search",
                  "yts",
                ],
                "select": {
                  "exist": [
                    "text",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
