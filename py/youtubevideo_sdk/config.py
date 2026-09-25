# YoutubeVideo SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "YoutubeVideo",
            "slug": "youtube-video",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "channel",
            "title": "Channel",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the YouTube channel that uploaded the video",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
            "short": "Description of the video",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$STRING`",
            "req": True,
            "short": "Duration of the video",
          },
          {
            "name": "thumbnail",
            "title": "Thumbnail",
            "type": "`$STRING`",
            "req": True,
            "short": "URL to the video thumbnail image",
            "format": "uri",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
            "short": "Title of the YouTube video",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "short": "Type of content",
          },
          {
            "name": "uploaded",
            "title": "Uploaded",
            "type": "`$STRING`",
            "req": True,
            "short": "Time since the video was uploaded",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Direct URL to the YouTube video",
            "format": "uri",
          },
          {
            "name": "views",
            "title": "Views",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of views the video has received",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "yts",
                  },
                ],
                "parts": [
                  "api",
                  "search",
                  "yts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "args": {
                  "query": [
                    {
                      "name": "text",
                      "orig": "text",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "heat waves",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "text",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
