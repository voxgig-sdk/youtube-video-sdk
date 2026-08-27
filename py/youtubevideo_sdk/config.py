# YoutubeVideo SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "req": True,
            "short": "Name of the YouTube channel that uploaded the video",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "req": True,
            "short": "Description of the video",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "req": True,
            "short": "Duration of the video",
            "type": "`$STRING`",
          },
          {
            "name": "thumbnail",
            "req": True,
            "short": "URL to the video thumbnail image",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "req": True,
            "short": "Title of the YouTube video",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "short": "Type of content",
            "type": "`$STRING`",
          },
          {
            "name": "uploaded",
            "req": True,
            "short": "Time since the video was uploaded",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "req": True,
            "short": "Direct URL to the YouTube video",
            "type": "`$STRING`",
          },
          {
            "name": "views",
            "req": True,
            "short": "Number of views the video has received",
            "type": "`$INTEGER`",
          },
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
