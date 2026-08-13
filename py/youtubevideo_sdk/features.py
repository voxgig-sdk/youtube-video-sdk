# YoutubeVideo SDK feature factory

from youtubevideo_sdk.feature.base_feature import YoutubeVideoBaseFeature
from youtubevideo_sdk.feature.test_feature import YoutubeVideoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YoutubeVideoBaseFeature(),
        "test": lambda: YoutubeVideoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
