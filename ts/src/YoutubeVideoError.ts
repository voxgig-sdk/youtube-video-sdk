
import { Context } from './Context'


class YoutubeVideoError extends Error {

  isYoutubeVideoError = true

  sdk = 'YoutubeVideo'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YoutubeVideoError
}

