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
              "req" => true,
              "short" => "Name of the YouTube channel that uploaded the video",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "req" => true,
              "short" => "Description of the video",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "req" => true,
              "short" => "Duration of the video",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "thumbnail",
              "req" => true,
              "short" => "URL to the video thumbnail image",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "Title of the YouTube video",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "short" => "Type of content",
              "type" => "`$STRING`",
            },
            {
              "name" => "uploaded",
              "req" => true,
              "short" => "Time since the video was uploaded",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "url",
              "req" => true,
              "short" => "Direct URL to the YouTube video",
              "type" => "`$STRING`",
            },
            {
              "name" => "views",
              "req" => true,
              "short" => "Number of views the video has received",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "yts",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "heat waves",
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "text",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                  "parts" => [
                    "api",
                    "search",
                    "yts",
                  ],
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
