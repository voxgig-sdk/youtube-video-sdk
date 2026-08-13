# YoutubeVideo SDK exists test

import pytest
from youtubevideo_sdk import YoutubeVideoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YoutubeVideoSDK.test(None, None)
        assert testsdk is not None
