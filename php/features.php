<?php
declare(strict_types=1);

// YoutubeVideo SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YoutubeVideoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YoutubeVideoBaseFeature();
            case "test":
                return new YoutubeVideoTestFeature();
            default:
                return new YoutubeVideoBaseFeature();
        }
    }
}
