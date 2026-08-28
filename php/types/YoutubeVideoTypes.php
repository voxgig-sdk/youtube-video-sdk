<?php
declare(strict_types=1);

// Typed models for the YoutubeVideo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Yts entity data model. */
class Yts
{
    public string $channel;
    public string $description;
    public string $duration;
    public string $thumbnail;
    public string $title;
    public string $type;
    public string $uploaded;
    public string $url;
    public int $views;
}

/** Request payload for Yts#load. */
class YtsLoadMatch
{
    public string $text;
}

