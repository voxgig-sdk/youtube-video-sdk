<?php
declare(strict_types=1);

// YoutubeVideo SDK utility: result_headers

class YoutubeVideoResultHeaders
{
    public static function call(YoutubeVideoContext $ctx): ?YoutubeVideoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
