<?php
declare(strict_types=1);

// YoutubeVideo SDK utility: result_body

class YoutubeVideoResultBody
{
    public static function call(YoutubeVideoContext $ctx): ?YoutubeVideoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
