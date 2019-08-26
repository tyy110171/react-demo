import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from "path";

export interface BizConfig {
    view: any;
    static: any;
    security: any;
}

export type DefaultConfig = PowerPartial<EggAppConfig> & BizConfig;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1566791136564_4916';

    // add your egg config in here
    config.middleware = [];

    config.static = {
        prefix: '/',
        dynamic: true,
        buffer: true,
        gzip: true,
    };

    config.security = {
        csrf: {
            enable: false,
            headerName: "gr-csrf-token",
        },
    };

    config.view = {
        root: [
            path.join(appInfo.baseDir, "app/public"),
        ].join(","),
        defaultViewEngine: "nunjucks",
        defaultExtension: ".html",
    };

    // the return config will combines to EggAppConfig
    return {
        ...config
    };
};
