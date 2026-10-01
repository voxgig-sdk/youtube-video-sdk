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
                "slug" => "youtube-video",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'HTTP status code',
            ],
            [
              'name' => 'creator',
              'title' => 'Creator',
              'type' => '`$STRING`',
              'short' => 'API creator attribution',
            ],
            [
              'name' => 'result',
              'title' => 'Result',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Indicates if the request was successful',
            ],
          ],
          'name' => 'yts',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/search/yts',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'search',
                    ],
                    [
                      'lit' => 'yts',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'search',
                    'yts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'text',
                        'orig' => 'text',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'heat waves',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'text',
                    ],
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
