# YoutubeVideo SDK exists test

require "minitest/autorun"
require_relative "../YoutubeVideo_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YoutubeVideoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
