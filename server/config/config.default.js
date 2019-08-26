/* eslint valid-jsdoc: "off" */

'use strict';
const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1566829727882_802';

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

    return {
        ...config,
    };
};
