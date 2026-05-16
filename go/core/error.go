package core

type YoutubeVideoError struct {
	IsYoutubeVideoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYoutubeVideoError(code string, msg string, ctx *Context) *YoutubeVideoError {
	return &YoutubeVideoError{
		IsYoutubeVideoError: true,
		Sdk:              "YoutubeVideo",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YoutubeVideoError) Error() string {
	return e.Msg
}
