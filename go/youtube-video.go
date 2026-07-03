package voxgigyoutubevideosdk

import (
	"github.com/voxgig-sdk/youtube-video-sdk/go/core"
	"github.com/voxgig-sdk/youtube-video-sdk/go/entity"
	"github.com/voxgig-sdk/youtube-video-sdk/go/feature"
	_ "github.com/voxgig-sdk/youtube-video-sdk/go/utility"
)

// Type aliases preserve external API.
type YoutubeVideoSDK = core.YoutubeVideoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type YoutubeVideoEntity = core.YoutubeVideoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type YoutubeVideoError = core.YoutubeVideoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewYtsEntityFunc = func(client *core.YoutubeVideoSDK, entopts map[string]any) core.YoutubeVideoEntity {
		return entity.NewYtsEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewYoutubeVideoSDK = core.NewYoutubeVideoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewYoutubeVideoSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *YoutubeVideoSDK  { return NewYoutubeVideoSDK(nil) }
func Test() *YoutubeVideoSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
