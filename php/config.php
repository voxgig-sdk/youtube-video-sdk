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
              'name' => 'code',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'creator',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'result',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
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
                    'res' => '`body`',
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
