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

    config.static = {
        dir: "../build/react-demo/app/public",
        gzip: true,
        buffer: false,
    };

    config.view = {
        root: [
            path.join(appInfo.baseDir, "../build/react-demo/app/public"),
        ].join(","),
        defaultViewEngine: "nunjucks",
        defaultExtension: ".html",
    };

    return config;
};
