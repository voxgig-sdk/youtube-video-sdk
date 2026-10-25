# YoutubeVideo SDK utility: prepare_body
require_relative 'media'
module YoutubeVideoUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return YoutubeVideoUtilities.raw_body(ctx.reqdata) if YoutubeVideoUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
