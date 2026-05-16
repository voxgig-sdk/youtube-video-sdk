# YoutubeVideo SDK utility: make_context
require_relative '../core/context'
module YoutubeVideoUtilities
  MakeContext = ->(ctxmap, basectx) {
    YoutubeVideoContext.new(ctxmap, basectx)
  }
end
