import { YoutubeVideoEntityBase } from '../YoutubeVideoEntityBase';
import type { YoutubeVideoSDK } from '../YoutubeVideoSDK';
import type { Control } from '../types';
import type { Yts, YtsLoadMatch } from '../YoutubeVideoTypes';
declare class YtsEntity extends YoutubeVideoEntityBase<Yts> {
    constructor(client: YoutubeVideoSDK, entopts: any);
    make(this: YtsEntity): YtsEntity;
    load(this: any, reqmatch?: YtsLoadMatch, ctrl?: Control): Promise<YtsEntity>;
}
export { YtsEntity };
