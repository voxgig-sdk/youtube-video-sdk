package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YoutubeVideo",
			"slug": "youtube-video",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://abhi-api.vercel.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"yts": map[string]any{},
			},
		},
		"entity": map[string]any{
			"yts": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "channel",
						"req": true,
						"short": "Name of the YouTube channel that uploaded the video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"req": true,
						"short": "Description of the video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"req": true,
						"short": "Duration of the video",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "thumbnail",
						"req": true,
						"short": "URL to the video thumbnail image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"short": "Title of the YouTube video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "Type of content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uploaded",
						"req": true,
						"short": "Time since the video was uploaded",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"req": true,
						"short": "Direct URL to the YouTube video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "views",
						"req": true,
						"short": "Number of views the video has received",
						"type": "`$INTEGER`",
					},
				},
				"name": "yts",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "heat waves",
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/search/yts",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "yts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"text",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"parts": []any{
									"api",
									"search",
									"yts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
