import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
    treeShaking: true,
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: {
                immer: true
            },
            dynamicImport: false,
            title: 'react-demo',
            dll: false,

            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
        }]
    ],
}

export default config;
