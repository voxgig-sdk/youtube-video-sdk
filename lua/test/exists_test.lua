-- YoutubeVideo SDK exists test

local sdk = require("youtube-video_sdk")

describe("YoutubeVideoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
