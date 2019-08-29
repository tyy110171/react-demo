import axios from 'axios';

const service = axios.create();
// http请求发送过滤器
service.interceptors.request.use(
    (config: any) => {
        if (!config.contentType) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }

        config.withCredentials = true; // 允许携带cookie
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

export default service;
