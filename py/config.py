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
            "auth": {
                "prefix": "Bearer",
            },
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
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "creator",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "yts",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
