package = "voxgig-sdk-youtube-video"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/youtube-video-sdk.git"
}
description = {
  summary = "YoutubeVideo SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["youtube-video_sdk"] = "youtube-video_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
