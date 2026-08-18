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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "thumbnail",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "uploaded",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "views",
              "req" => true,
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
                  "parts" => [
                    "api",
                    "search",
                    "yts",
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
