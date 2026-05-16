<?php
declare(strict_types=1);

// YoutubeVideo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YoutubeVideoMakeContext
{
    public static function call(array $ctxmap, ?YoutubeVideoContext $basectx): YoutubeVideoContext
    {
        return new YoutubeVideoContext($ctxmap, $basectx);
    }
}
