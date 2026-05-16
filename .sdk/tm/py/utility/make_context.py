# YoutubeVideo SDK utility: make_context

from core.context import YoutubeVideoContext


def make_context_util(ctxmap, basectx):
    return YoutubeVideoContext(ctxmap, basectx)
