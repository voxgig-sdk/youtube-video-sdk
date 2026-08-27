-- YoutubeVideo SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "YoutubeVideo",
      slug = "youtube-video",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://abhi-api.vercel.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["yts"] = {},
      },
    },
    entity = {
      ["yts"] = {
        ["fields"] = {
          {
            ["name"] = "channel",
            ["req"] = true,
            ["short"] = "Name of the YouTube channel that uploaded the video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["req"] = true,
            ["short"] = "Description of the video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration",
            ["req"] = true,
            ["short"] = "Duration of the video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "thumbnail",
            ["req"] = true,
            ["short"] = "URL to the video thumbnail image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["short"] = "Title of the YouTube video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["short"] = "Type of content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "uploaded",
            ["req"] = true,
            ["short"] = "Time since the video was uploaded",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "Direct URL to the YouTube video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "views",
            ["req"] = true,
            ["short"] = "Number of views the video has received",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "yts",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "heat waves",
                      ["kind"] = "query",
                      ["name"] = "text",
                      ["orig"] = "text",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/search/yts",
                ["parts"] = {
                  "api",
                  "search",
                  "yts",
                },
                ["select"] = {
                  ["exist"] = {
                    "text",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
