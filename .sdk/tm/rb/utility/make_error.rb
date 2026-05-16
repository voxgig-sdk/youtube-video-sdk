# YoutubeVideo SDK utility: make_error
require_relative '../core/operation'
require_relative '../core/result'
require_relative '../core/error'
module YoutubeVideoUtilities
  MakeError = ->(ctx, err) {
    if ctx.nil?
      require_relative '../core/context'
      ctx = YoutubeVideoContext.new({}, nil)
    end
    op = ctx.op || YoutubeVideoOperation.new({})
    opname = op.name
    opname = "unknown operation" if opname.empty? || opname == "_"

    result = ctx.result || YoutubeVideoResult.new({})
    result.ok = false

    err = result.err if err.nil?
    err = ctx.make_error("unknown", "unknown error") if err.nil?

    errmsg = err.is_a?(YoutubeVideoError) ? err.msg : err.to_s
    msg = "YoutubeVideoSDK: #{opname}: #{errmsg}"
    msg = ctx.utility.clean.call(ctx, msg)

    result.err = nil
    spec = ctx.spec

    if ctx.ctrl.explain
      ctx.ctrl.explain["err"] = { "message" => msg }
    end

    sdk_err = YoutubeVideoError.new("", msg, ctx)
    sdk_err.result = ctx.utility.clean.call(ctx, result)
    sdk_err.spec = ctx.utility.clean.call(ctx, spec)
    sdk_err.code = err.code if err.is_a?(YoutubeVideoError)

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err == false
      return result.resdata, nil
    end
    return nil, sdk_err
  }
end
