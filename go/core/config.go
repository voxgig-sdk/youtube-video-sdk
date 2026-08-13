package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YoutubeVideo",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "channel",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "duration",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "thumbnail",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "title",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "uploaded",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "views",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 8,
					},
				},
				"name": "yts",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
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
								"parts": []any{
									"api",
									"search",
									"yts",
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
								"index$": 0,
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
