# YoutubeVideo SDK configuration

module YoutubeVideoConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "YoutubeVideo",
        "slug" => "youtube-video",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://abhi-api.vercel.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "yts" => {},
        },
      },
      "entity" => {
        "yts" => {
          "fields" => [
            {
              "name" => "channel",
              "title" => "Channel",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Name of the YouTube channel that uploaded the video",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Description of the video",
            },
            {
              "name" => "duration",
              "title" => "Duration",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Duration of the video",
            },
            {
              "name" => "thumbnail",
              "title" => "Thumbnail",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "URL to the video thumbnail image",
              "format" => "uri",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Title of the YouTube video",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Type of content",
            },
            {
              "name" => "uploaded",
              "title" => "Uploaded",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Time since the video was uploaded",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Direct URL to the YouTube video",
              "format" => "uri",
            },
            {
              "name" => "views",
              "title" => "Views",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Number of views the video has received",
            },
          ],
          "name" => "yts",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/search/yts",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "search",
                    },
                    {
                      "lit" => "yts",
                    },
                  ],
                  "parts" => [
                    "api",
                    "search",
                    "yts",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "text",
                        "orig" => "text",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "heat waves",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "text",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YoutubeVideoFeatures.make_feature(name)
  end
end
