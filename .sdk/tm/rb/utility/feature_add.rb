# YoutubeVideo SDK utility: feature_add
module YoutubeVideoUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
