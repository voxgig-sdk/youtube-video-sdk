<?php
declare(strict_types=1);

// YoutubeVideo SDK configuration

class YoutubeVideoConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YoutubeVideo",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://abhi-api.vercel.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "yts" => [],
                ],
            ],
            "entity" => [
        'yts' => [
          'fields' => [
            [
              'name' => 'channel',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'thumbnail',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uploaded',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'views',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'yts',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'heat waves',
                        'kind' => 'query',
                        'name' => 'text',
                        'orig' => 'text',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/search/yts',
                  'parts' => [
                    'api',
                    'search',
                    'yts',
                  ],
                  'select' => [
                    'exist' => [
                      'text',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.result`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YoutubeVideoFeatures::make_feature($name);
    }
}
