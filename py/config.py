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
            "active": True,
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "creator",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
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
