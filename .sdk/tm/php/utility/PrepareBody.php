<?php
declare(strict_types=1);

// YoutubeVideo SDK utility: prepare_body

class YoutubeVideoPrepareBody
{
    public static function call(YoutubeVideoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
