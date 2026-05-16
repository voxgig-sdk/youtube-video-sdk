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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"name": "code",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "creator",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "result",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "yts",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
