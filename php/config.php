<?php
declare(strict_types=1);

// YoutubeVideo SDK configuration

class YoutubeVideoConfig
{
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
              'active' => true,
              'name' => 'channel',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'description',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'duration',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'thumbnail',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'uploaded',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'views',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 8,
            ],
          ],
          'name' => 'yts',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
