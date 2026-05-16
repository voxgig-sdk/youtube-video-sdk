-- YoutubeVideo SDK error

local YoutubeVideoError = {}
YoutubeVideoError.__index = YoutubeVideoError


function YoutubeVideoError.new(code, msg, ctx)
  local self = setmetatable({}, YoutubeVideoError)
  self.is_sdk_error = true
  self.sdk = "YoutubeVideo"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YoutubeVideoError:error()
  return self.msg
end


function YoutubeVideoError:__tostring()
  return self.msg
end


return YoutubeVideoError
