import { YtsEntity } from './entity/YtsEntity';
export type * from './YoutubeVideoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { YoutubeVideoEntityBase } from './YoutubeVideoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class YoutubeVideoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Yts(entopts?: Record<string, any>): YtsEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): YoutubeVideoSDK;
    tester(testopts?: any, sdkopts?: any): YoutubeVideoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof YoutubeVideoSDK;
export { stdutil, config, BaseFeature, YoutubeVideoEntityBase, YoutubeVideoSDK, SDK, };
export type { DirectResult };
