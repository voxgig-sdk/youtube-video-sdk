<?php
declare(strict_types=1);

// YoutubeVideo SDK utility: feature_add

class YoutubeVideoFeatureAdd
{
    public static function call(YoutubeVideoContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
