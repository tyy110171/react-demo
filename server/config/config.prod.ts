import { EggAppConfig, PowerPartial } from 'egg';
export interface BizConfig {
    view: any;
    static: any;
    security: any;
}

export type DefaultConfig = PowerPartial<EggAppConfig> & BizConfig;

export default () => {
    const config = {} as DefaultConfig;

    config.logger = {
        consoleLevel: "INFO",
        disableConsoleAfterReady: false,
    };
    return config;
};
