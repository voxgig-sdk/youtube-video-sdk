import { Context } from './Context';
declare class YoutubeVideoError extends Error {
    isYoutubeVideoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { YoutubeVideoError };
