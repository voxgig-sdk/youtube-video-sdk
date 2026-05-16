package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewYtsEntityFunc func(client *YoutubeVideoSDK, entopts map[string]any) YoutubeVideoEntity

