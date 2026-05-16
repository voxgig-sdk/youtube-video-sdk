<?php
declare(strict_types=1);

// YoutubeVideo SDK base feature

class YoutubeVideoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(YoutubeVideoContext $ctx, array $options): void {}
    public function PostConstruct(YoutubeVideoContext $ctx): void {}
    public function PostConstructEntity(YoutubeVideoContext $ctx): void {}
    public function SetData(YoutubeVideoContext $ctx): void {}
    public function GetData(YoutubeVideoContext $ctx): void {}
    public function GetMatch(YoutubeVideoContext $ctx): void {}
    public function SetMatch(YoutubeVideoContext $ctx): void {}
    public function PrePoint(YoutubeVideoContext $ctx): void {}
    public function PreSpec(YoutubeVideoContext $ctx): void {}
    public function PreRequest(YoutubeVideoContext $ctx): void {}
    public function PreResponse(YoutubeVideoContext $ctx): void {}
    public function PreResult(YoutubeVideoContext $ctx): void {}
    public function PreDone(YoutubeVideoContext $ctx): void {}
    public function PreUnexpected(YoutubeVideoContext $ctx): void {}
}
