"use strict";

const path = require("path");
module.exports = (appInfo) => {
    const config = {};
    config.static = {
        gzip: true,
        buffer: false,
    };
    config.view = {
        root: [
            path.join(appInfo.baseDir, "app/public"),
        ].join(","),
        defaultViewEngine: "nunjucks",
        defaultExtension: ".html",
    };
    return config;
};
