# YoutubeVideo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YoutubeVideoFeatures
  def self.make_feature(name)
    case name
    when "base"
      YoutubeVideoBaseFeature.new
    when "ratelimit"
      YoutubeVideoRatelimitFeature.new
    when "retry"
      YoutubeVideoRetryFeature.new
    when "test"
      YoutubeVideoTestFeature.new
    when "timeout"
      YoutubeVideoTimeoutFeature.new
    else
      YoutubeVideoBaseFeature.new
    end
  end
end
