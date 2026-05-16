# YoutubeVideo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YoutubeVideoFeatures
  def self.make_feature(name)
    case name
    when "base"
      YoutubeVideoBaseFeature.new
    when "test"
      YoutubeVideoTestFeature.new
    else
      YoutubeVideoBaseFeature.new
    end
  end
end
