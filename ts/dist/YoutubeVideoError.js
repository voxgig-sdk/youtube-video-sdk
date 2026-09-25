"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeVideoError = void 0;
class YoutubeVideoError extends Error {
    isYoutubeVideoError = true;
    sdk = 'YoutubeVideo';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.YoutubeVideoError = YoutubeVideoError;
//# sourceMappingURL=YoutubeVideoError.js.map